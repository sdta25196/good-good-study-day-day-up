from getVector import getVector

seen_lines = set()

# ! 读取 data 文件并处理，使用viking处理然后写入data1
with open('data', 'r', encoding='utf-8') as data_file, open('data1', 'w', encoding='utf-8') as data1_file:
    for line in data_file:
        # 去除行尾的换行符
        line = line.strip()
        # 检查这一行是否已经处理过
        if line not in seen_lines:
            result = getVector(line)
            # 写入到 data1 文件
            data1_file.write(
                '{{"question": "{}", "answer": "{}"}}\n'.format(line, result))
            seen_lines.add(line)

print("处理完成，结果已写入 data1 文件。")
