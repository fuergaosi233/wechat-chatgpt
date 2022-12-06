#!/usr/bin/python
# -*- coding: UTF-8 -*-

import os
import sys
def login(email, password):
    chatbot = Chatbot(
        config={
            "email": email,
            "password": password,
            "proxy": os.environ.get("http_proxy", None),
        },
        conversation_id=None,
    )
    chatbot.login(
        email=email,
        password=password,
    )
    return chatbot.config.get('session_token')

if __name__ == "__main__":
    try:
        from revChatGPT.revChatGPT import Chatbot
    except:
        raise RuntimeError("Could import revChatGPT. Please install it first.You can run `poetry install` to install it.")
    print(sys.argv)
    email = sys.argv[1]
    password = sys.argv[2]
    print(login(email, password))
