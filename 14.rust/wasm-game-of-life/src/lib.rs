extern crate js_sys;
extern crate wasm_bindgen;
mod utils;

use std::fmt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
} // 每个格子的生命

impl Cell {
    fn toggle(&mut self) {
        *self = match *self {
            Cell::Dead => Cell::Alive,
            Cell::Alive => Cell::Dead,
        };
    }
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,       // 宇宙宽
    height: u32,      // 宇宙高
    cells: Vec<Cell>, // 每个格子的状态
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Dead { '◻' } else { '◼' };
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }

        Ok(())
    }
}

impl Universe {
    // 把行、列对应的格子，转换成索引，从0行0列开始，宽度从1开始计算
    fn get_index(&self, row: u32, column: u32) -> usize {
        /*
        |0|1|2|
        |3|4|5| // 第二行第一列是3
        */
        (row * self.width + column) as usize
    }

    // 计算附近活着的邻居 1 循环计算 On2
    // fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
    //     let mut count = 0;
    //     // 循环行
    //     for delta_row in [self.height - 1, 0, 1].iter().cloned() {
    //         // 循环列
    //         for delta_col in [self.width - 1, 0, 1].iter().cloned() {
    //             if delta_row == 0 && delta_col == 0 {
    //                 continue; // 过滤掉当前格子，只看八个邻居
    //             }
    //             // （行+高度所在的下标） % 高度 得到上一行。  行 % 高度得到当前行 。 （行+1） %高度得到下一行
    //             let neighbor_row = (row + delta_row) % self.height;
    //             let neighbor_col = (column + delta_col) % self.width;
    //             // 获取邻居们的存活状态
    //             let idx = self.get_index(neighbor_row, neighbor_col);
    //             count += self.cells[idx] as u8;
    //         }
    //     }
    //     count
    // }
    // 计算附近活着的邻居 2 直接计算 O1
    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;

        let north = if row == 0 { self.height - 1 } else { row - 1 };

        let south = if row == self.height - 1 { 0 } else { row + 1 };

        let west = if column == 0 {
            self.width - 1
        } else {
            column - 1
        };

        let east = if column == self.width - 1 {
            0
        } else {
            column + 1
        };

        let nw = self.get_index(north, west);
        count += self.cells[nw] as u8;

        let n = self.get_index(north, column);
        count += self.cells[n] as u8;

        let ne = self.get_index(north, east);
        count += self.cells[ne] as u8;

        let w = self.get_index(row, west);
        count += self.cells[w] as u8;

        let e = self.get_index(row, east);
        count += self.cells[e] as u8;

        let sw = self.get_index(south, west);
        count += self.cells[sw] as u8;

        let s = self.get_index(south, column);
        count += self.cells[s] as u8;

        let se = self.get_index(south, east);
        count += self.cells[se] as u8;

        count
    }
}

// 暴漏给JS的方法
#[wasm_bindgen]
impl Universe {
    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    // 控制下一步计算
    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                let next_cell = match (cell, live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbours
                    // dies, as if caused by underpopulation.
                    (Cell::Alive, x) if x < 2 => Cell::Dead,
                    // Rule 2: Any live cell with two or three live neighbours
                    // lives on to the next generation.
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    // Rule 3: Any live cell with more than three live
                    // neighbours dies, as if by overpopulation.
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    // Rule 4: Any dead cell with exactly three live neighbours
                    // becomes a live cell, as if by reproduction.
                    (Cell::Dead, 3) => Cell::Alive,
                    // All other cells remain in the same state.
                    (otherwise, _) => otherwise,
                };
                next[idx] = next_cell;
            }
        }
        self.cells = next;
    }

    // 创建宇宙
    pub unsafe fn new(width: u32, height: u32) -> Universe {
        let cells = (0..width * height)
            .map(|_| {
                if js_sys::Math::random() < 0.5 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        Universe {
            width,
            height,
            cells,
        }
    }

    pub unsafe fn random_cell(&mut self) {
        let cells = (0..self.width * self.height)
            .map(|_| {
                if js_sys::Math::random() < 0.5 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        self.cells = cells
    }

    // 渲染
    pub fn render(&self) -> String {
        self.to_string()
    }

    // 切换宇宙格子生命状态
    pub fn toggle_cell(&mut self, row: u32, column: u32) {
        let idx = self.get_index(row, column);
        self.cells[idx].toggle();
    }
}
