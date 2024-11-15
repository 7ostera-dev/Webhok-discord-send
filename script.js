// script.js
document.getElementById('webhookForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const apiURL = document.getElementById('apiURL').value;
    const message = document.getElementById('message').value;
    const messageType = document.querySelector('input[name="messageType"]:checked').value;
    const embedTitle = document.getElementById('embedTitle').value;
    const embedURL = document.getElementById('embedURL').value;
    const embedDescription = document.getElementById('embedDescription').value;

    if (!apiURL) {
        document.getElementById('errorMessage').innerText = 'الرجاء إدخال رابط الويب هوك';
        return;
    }

    if (!message && !embedTitle) {
        document.getElementById('errorMessage').innerText = 'يجب إدخال رسالة أو عنوان للإيمبد';
        return;
    }

    const data = {
        content: messageType === 'text' || messageType === 'both' ? message : '',
        embeds: messageType === 'embed' || messageType === 'both' ? [{
            title: embedTitle || null,
            url: embedURL || null,
            description: embedDescription || null,
            color: 5814783
        }] : []
    };

    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            document.getElementById('successMessage').innerText = 'تم إرسال الرسالة بنجاح!';
            document.getElementById('errorMessage').innerText = '';
        } else {
            document.getElementById('errorMessage').innerText = 'فشل في إرسال الرسالة. تحقق من الرابط.';
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = 'حدث خطأ أثناء الإرسال.';
    }
});
