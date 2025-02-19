# Cheat Sheet

## Initial prompt
This prompt worked really good for me, both with agent-mode and normal-mode

Remember to add @codebase and @46elks to the prompt
```
I want to implement an sms provider, 46elks, here is the docs @46elks

I want a new page in the frontend where I can enter a "From" phone number, a "To" phone number, and a text message and then send an sms. 

The 46elks needs to be integrated, there needs to be endpoints for this, frontend needs to be able to communicate with the backend.

Think step by step of how to do this, and also, before you start writing any code. 

Pleae give me an overview of what you are going to do so I can verify that you understood this. Also, ask questions if something is unclear

When I have verified the overview, first of all update  a file calledproject-status.md 

With what we are gonna implement, and for each iteration, always finish that iteration with updating project-status.md
```