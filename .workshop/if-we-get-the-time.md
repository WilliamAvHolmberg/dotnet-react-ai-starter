1. Add Claude Documentation: https://www.anthropic.com/docs

2. @Claude Help me build a feature so I can click a button and let claude analyze the current sms message and give me suggestions of how to improve it! @Codebase Do not use any external dependency, just use the claude api and implement it raw!
3. 
curl https://api.anthropic.com/v1/messages \
     --header "x-api-key: $ANTHROPIC_API_KEY" \
     --header "anthropic-version: 2023-06-01" \
     --header "content-type: application/json" \
     --data \
'{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [
        {"role": "user", "content": "Hello, world"}
    ]
}'

4. Use model claude-3-5-sonnet-20241022
5. Please, let the user pick between the alternatives and the improvements. Make sure claude responds with structured json and this should be presented as a list of options to the user in the ui. User should be able to pick one of the options. 