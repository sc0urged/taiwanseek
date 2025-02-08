document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('taiwanThinkButton');
    const audio = document.getElementById('taiwanAudio');
    const messageInput = document.querySelector('input[type="text"]');
    const sendButton = document.querySelector('.send-button');
    const messageBlock = document.querySelector('.message-block');
    
    // Функция для кнопки TaiwanThink
    button.addEventListener('click', function() {
        // Переключаем активное состояние кнопки
        this.classList.toggle('active');
        
        // Если кнопка активна - играем музыку, иначе останавливаем
        if (this.classList.contains('active')) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    // Функция добавления сообщения в чат
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        messageBlock.appendChild(messageDiv);
        messageBlock.scrollTop = messageBlock.scrollHeight;
    }

    // Обновленная функция для эффекта печатания с добавлением кнопки лайка
    function typeMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p></p>
            </div>
        `;
        messageBlock.appendChild(messageDiv);
        
        const messageParagraph = messageDiv.querySelector('p');
        let index = 0;
        
        function typeNextChar() {
            if (index < text.length) {
                messageParagraph.textContent += text.charAt(index);
                index++;
                messageBlock.scrollTop = messageBlock.scrollHeight;
                setTimeout(typeNextChar, 50);
            } else {
                // Добавляем кнопку лайка после завершения печатания
                const likeButton = document.createElement('button');
                likeButton.className = 'like-button';
                likeButton.innerHTML = `
                    <svg viewBox="0 0 24 24">
                        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
                    </svg>
                `;
                messageDiv.appendChild(likeButton);
                
                // Добавляем обработчик для кнопки лайка
                likeButton.addEventListener('click', function() {
                    this.classList.toggle('liked');
                });
            }
        }
        
        setTimeout(typeNextChar, 500);
    }

    // Функция создания индикатора загрузки
    function createLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message';
        loadingDiv.innerHTML = `
            <div class="loading-message">
                <div class="loading-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;
        return loadingDiv;
    }

    // Обработка отправки сообщения
    function handleSendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Очищаем поле ввода сразу
            messageInput.value = '';
            
            // Добавляем сообщение пользователя сразу
            addMessage(message, true);

            // Показываем индикатор загрузки на стороне бота
            const loadingIndicator = createLoadingIndicator();
            messageBlock.appendChild(loadingIndicator);
            messageBlock.scrollTop = messageBlock.scrollHeight;
            
            // Через 1.5 секунды показываем ответ бота
            setTimeout(() => {
                // Удаляем индикатор загрузки
                messageBlock.removeChild(loadingIndicator);
                // Добавляем ответ бота с эффектом печатания
                typeMessage('Taiwan is not China');
            }, 1500);
        }
    }

    // Обработчики событий для отправки сообщения
    sendButton.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Функция для показа уведомления
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Удаляем уведомление через 2 секунды
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 2000);
    }

    // Добавляем обработчик для кнопки Copy CA
    const copyCAButton = document.querySelector('.copy-ca-button');
    const contractAddress = 'Soon'; // Пример адреса

    copyCAButton.addEventListener('click', function() {
        navigator.clipboard.writeText(contractAddress).then(() => {
            this.classList.add('copied');
            setTimeout(() => {
                this.classList.remove('copied');
            }, 2000);
        });
    });
}); 