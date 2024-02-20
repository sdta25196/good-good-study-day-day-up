import asyncio
from promptflow import tool

import semantic_kernel as sk
from semantic_kernel.planning.sequential_planner import SequentialPlanner
from plugins.MathPlugin.Math import Math as Math
from promptflow.connections import (
    OpenAIConnection,
)

from semantic_kernel.connectors.ai.open_ai import (
    OpenAIChatCompletion,
    OpenAITextEmbedding,
)


@tool
def my_python_tool(
    input: str,
    deployment_type: str,
    deployment_name: str,
    OpenAIConnection: OpenAIConnection,
) -> str:
    # Initialize the kernel
    kernel = sk.Kernel(log=sk.NullLogger())

    # Add the chat service
    if deployment_type == "chat-completion":
        kernel.add_chat_service(
            "chat_completion",
            OpenAIChatCompletion(
                deployment_name,
                OpenAIConnection.api_key,
            ),
        )
    elif deployment_type == "text-completion":
        kernel.add_text_completion_service(
            "text_completion",
            OpenAIChatCompletion(
                deployment_name,
                OpenAIConnection.api_key,
            ),
        )

    planner = SequentialPlanner(kernel=kernel)

    # Import the native functions
    math_plugin = kernel.import_skill(Math(), "MathPlugin")

    ask = "Use the available math functions to solve this word problem: " + input

    plan = asyncio.run(planner.create_plan_async(ask))

    # Execute the plan
    result = asyncio.run( plan.invoke_async() )
    #print(result)

    for index, step in enumerate(plan._steps):
        print(step)
        print("Function: " + step.skill_name + "." + step._function.name)
        print("Input vars: " + str(step.parameters.variables))
        print("Output vars: " + str(step._outputs))
    print("Result: " + str(result))

    return str(result)
