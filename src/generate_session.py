#!/usr/bin/python
# -*- coding: UTF-8 -*-

import re
import os
import argparse


def email_type(value: str) -> str:
    """validator on email"""
    email_pattern = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    if not email_pattern.match(value):
        raise argparse.ArgumentTypeError(f"'{value}' is not a valid email")
    return value


def login(email: str, password: str) -> str:
    """generate ChatGPT session_token by email and password"""
    chatbot = Chatbot(
        config={
            "email": email,
            "password": password,
            "proxy": os.environ.get("http_proxy",None) or os.environ.get("openAIProxy", None) ,
        },
        conversation_id=None,
    )
    chatbot.login(
        email=email,
        password=password,
    )
    return chatbot.config.get('session_token')


def gen_argparser() -> argparse.Namespace:
    """generate argparser"""
    parser = argparse.ArgumentParser(description="generate ChatGPT seesion token")
    parser.add_argument("email", type=email_type, help="email address of your ChatGPT account")
    parser.add_argument("password", type=str, help="password of your ChatGPT account")
    arguments = parser.parse_args()
    return arguments


if __name__ == "__main__":
    try:
        from revChatGPT.revChatGPT import Chatbot
    except:
        raise RuntimeError("Could import revChatGPT. Please install it first. You can run `poetry install` to install it.")
    args = gen_argparser()
    print(args)
    print(login(args.email, args.password))
