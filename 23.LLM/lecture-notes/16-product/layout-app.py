import gradio as gr

with gr.Blocks() as demo:
    gr.Markdown("""
# 演示 Gradio 的布局
        
并没有实际功能
        """)

    with gr.Tab("默认布局"):
        gr.Button("按钮1")
        gr.Button("按钮2")
        gr.Button("按钮3")
        gr.Button("按钮4")
        gr.Button("按钮5")
        gr.Button("按钮6")

    with gr.Tab("横向布局"):
        with gr.Row():
            gr.Button("按钮1"),
            gr.Button("按钮2"),
        with gr.Row():
            gr.Button("按钮3"),
            gr.Button("按钮4"),
            gr.Button("按钮5"),
        with gr.Row():
            gr.Button("按钮6", scale=2),
            gr.Button("按钮7"),
            gr.Button("按钮8"),

    with gr.Tab("纵向布局"):
        with gr.Row():
            with gr.Column():
                gr.Button("按钮1"),
                gr.Button("按钮2"),

            gr.Button("按钮3"),
            gr.Button("按钮4"),

demo.launch()