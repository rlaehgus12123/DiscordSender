const axios = require('axios');

class chatgpt {
    constructor(ChatList) {
        this.ChatList = ChatList
    }

    async createText() {
        const response = await axios({
            'url': 'https://hdstockimages.com/wp-admin/admin-ajax.php',
            'method': 'POST',
            'headers': {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
            },
            'data': {
                'action': 'generate_api_key',
                'gpt_input': `${this.ChatList}\n\n이 대화방에서 가져온 대화 내용이야. 이 흐름에 맞춰서 적절한 답변을 생성해줘.\n
        
                **중요한 조건**  
                1. 나는 아직 게임을 시작하지 않은 상태야.  
                2. 이 게임은 디스코드 레벨 50을 달성해야만 할 수 있어 그러니까 그냥 참고만해 
                3. 영어로 답변을 해줘.  
                4. AI가 작성한 티가 나지 않도록 자연스럽고 일상적인 표현을 사용해줘.  
                5. 문장이 너무 길지 않게 간결하고 명확하게 만들어줘.  
                6. 최신 유행어나 현지에서 쓰는 표현을 자연스럽게 포함해줘.  
                7. '6:'처럼 플레이어를 구분하는 형식은 절대로 포함하지 마.  
                8. 질문을 던지는 말투가 아닌, 자연스러운 대화 흐름으로 작성해줘. 
                9. 15글자를 넘기지마 
                10. 질문하지마.
                11. 느낌표 사용하지마
                12. 나의 기분을 너무 말하지마 쉬고있다 뭐하고있다 등등 너무 그런걸 말하지마
        
                **금지 사항**  
                - 스팸성 반복적인 표현  
                - 의미 없는 긴 문장  
                - 너무 직설적이고 로봇 같은 대답  
                - 질문하지마
                - 15글자를 넘기지마
                - 느낌표 사용하지마
                - 나의 기분을 너무 말하지마 쉬고있다 뭐하고있다 등등 너무 그런걸 말하지마
        
                위 조건들을 잘 지켜서, 자연스러운 대화 스타일로 작성해줘.`,
                'nonce': 'c773f0da70',
            }
        });
    
        return response.data.trim();
    }
}

module.exports = chatgpt