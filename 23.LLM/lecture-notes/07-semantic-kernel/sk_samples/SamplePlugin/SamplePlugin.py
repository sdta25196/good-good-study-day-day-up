from semantic_kernel.skill_definition import sk_function, sk_function_context_parameter
from semantic_kernel.orchestration.sk_context import SKContext
import json

class CommandVerifier:
    @sk_function(
        description="检查命令是否合法",
        name="verifyCommand",
    )
    def verify(self, command: str) -> str:
        if ">" in command:
            return "非法"
        parts = command.replace(';', '|').split('|')
        for cmd in parts:
            name = cmd.split(" ")[0]
            if name not in ["ls","cat","head","tail","echo"]:
                return "非法"
        return "合法"