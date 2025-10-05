// Contact page JavaScript - handles form interactions and Microsoft Forms integration

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    handleURLParameters();
    initializeMSFormsIntegration();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Handle character count for textarea
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            addCharacterCounter(messageTextarea);
        }
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.form-submit-btn');
    
    // Validate form
    if (!validateForm(form)) {
        CatalogUtils.showNotification('אנא מלאו את כל השדות הנדרשים בצורה נכונה', 'error');
        return;
    }
    
    // Show loading state
    const hideLoadingState = CatalogUtils.showLoadingState(submitBtn, 'שולח הודעה...');
    
    // Collect form data
    const formData = collectFormData(form);
    
    // Simulate form submission (in real app, this would send to server)
    setTimeout(() => {
        // Simulate success/failure
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        hideLoadingState();
        
        if (success) {
            handleSuccessfulSubmission(formData);
        } else {
            handleFailedSubmission();
        }
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    
    // Required fields validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    
    // Remove existing error
    clearFieldError({ target: field });
    
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'שדה זה הוא חובה';
    }
    // Email validation
    else if (fieldType === 'email' && value && !CatalogUtils.validateEmail(value)) {
        isValid = false;
        errorMessage = 'כתובת אימייל לא תקינה';
    }
    // Phone validation
    else if (fieldType === 'tel' && value && !CatalogUtils.validatePhone(value)) {
        isValid = false;
        errorMessage = 'מספר טלפון לא תקין';
    }
    // Message length validation
    else if (fieldName === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'ההודעה חייבת להכיל לפחות 10 תווים';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    
    // Add error class
    field.classList.add('error');
    formGroup.classList.add('error');
    
    // Create or update error message
    let errorEl = formGroup.querySelector('.field-error');
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        formGroup.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

function clearFieldError(event) {
    const field = event.target;
    const formGroup = field.closest('.form-group');
    
    // Remove error class
    field.classList.remove('error');
    formGroup.classList.remove('error');
    
    // Remove error message
    const errorEl = formGroup.querySelector('.field-error');
    if (errorEl) {
        errorEl.remove();
    }
}

function addCharacterCounter(textarea) {
    const maxLength = 1000;
    const minLength = 10;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    textarea.parentNode.appendChild(counter);
    
    // Update counter function
    function updateCounter() {
        const length = textarea.value.length;
        counter.textContent = `${length}/${maxLength} תווים`;
        
        if (length < minLength) {
            counter.classList.add('warning');
            counter.classList.remove('good');
        } else if (length > maxLength * 0.8) {
            counter.classList.add('warning');
            counter.classList.remove('good');
        } else {
            counter.classList.add('good');
            counter.classList.remove('warning');
        }
    }
    
    // Set max length and add event listener
    textarea.setAttribute('maxlength', maxLength);
    textarea.addEventListener('input', updateCounter);
    
    // Initial update
    updateCounter();
}

function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add timestamp and source
    data.timestamp = new Date().toISOString();
    data.source = 'catalog-website';
    
    return data;
}

function handleSuccessfulSubmission(formData) {
    // Show success message
    CatalogUtils.showNotification('ההודעה נשלחה בהצלחה! נחזור אליכם בקרוב.', 'success');
    
    // Save to localStorage for reference
    CatalogUtils.setLocalStorage('lastContactSubmission', {
        ...formData,
        id: generateSubmissionId()
    });
    
    // Clear form
    document.getElementById('contact-form').reset();
    
    // Update character counter
    const counter = document.querySelector('.character-counter');
    if (counter) {
        counter.textContent = '0/1000 תווים';
        counter.classList.remove('warning', 'good');
    }
    
    // Show follow-up options
    showFollowUpOptions(formData);
}

function handleFailedSubmission() {
    CatalogUtils.showNotification('אירעה שגיאה בשליחת ההודעה. אנא נסו שנית.', 'error');
}

function generateSubmissionId() {
    return 'sub_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function showFollowUpOptions(formData) {
    const followUpHTML = `
        <div class="follow-up-options">
            <h3>מה הלאה?</h3>
            <p>תודה על פנייתכם! במקביל, אתם מוזמנים:</p>
            <div class="follow-up-actions">
                <button class="btn btn-secondary" onclick="scheduleMeeting()">לקבוע פגישת ייעוץ</button>
                <button class="btn btn-secondary" onclick="downloadPortfolio()">להוריד את התיק שלנו</button>
                <button class="btn btn-secondary" onclick="viewSimilarProjects()">לצפות בפרויקטים דומים</button>
            </div>
        </div>
    `;
    
    const formContainer = document.querySelector('.form-container');
    formContainer.insertAdjacentHTML('afterend', followUpHTML);
}

function scheduleMeeting() {
    CatalogUtils.showNotification('מעביר לקביעת פגישה...', 'info');
    // In real app: integrate with calendar scheduling service
    setTimeout(() => {
        CatalogUtils.showNotification('לינק לקביעת פגישה יישלח אליכם במייל', 'success');
    }, 1000);
}

function downloadPortfolio() {
    CatalogUtils.showNotification('מכין קובץ להורדה...', 'info');
    // In real app: generate and download portfolio PDF
    setTimeout(() => {
        CatalogUtils.showNotification('התיק שלנו זמין להורדה במייל שתקבלו', 'success');
    }, 1500);
}

function viewSimilarProjects() {
    // Redirect to gallery with relevant filter
    const lastSubmission = CatalogUtils.getLocalStorage('lastContactSubmission');
    if (lastSubmission && lastSubmission.projectType) {
        const category = lastSubmission.projectType.includes('video') ? 'video' : 'learning';
        window.location.href = `gallery.html?filter=${category}`;
    } else {
        window.location.href = 'gallery.html';
    }
}

function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    const type = urlParams.get('type');
    
    // Pre-fill service type if provided
    if (service) {
        const projectTypeSelect = document.getElementById('projectType');
        if (projectTypeSelect) {
            // Try to match the service to a project type
            const serviceMap = {
                'לומדה אינטראקטיבית': 'interactive-learning',
                'מדריך דיגיטלי': 'digital-guide',
                'חידון': 'quiz-game',
                'וידאו': 'video-production',
                'אנימציה': 'video-production'
            };
            
            const mappedType = serviceMap[service] || 'other';
            projectTypeSelect.value = mappedType;
        }
        
        // Pre-fill message with service reference
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            messageTextarea.value = `אני מעוניין/ת לקבל מידע נוסף על: ${decodeURIComponent(service)}.\n\n`;
            
            // Update character counter if it exists
            setTimeout(() => {
                const counter = document.querySelector('.character-counter');
                if (counter) {
                    const event = new Event('input');
                    messageTextarea.dispatchEvent(event);
                }
            }, 100);
        }
    }
    
    // Handle quote request type
    if (type === 'quote') {
        const messageTextarea = document.getElementById('message');
        if (messageTextarea && !messageTextarea.value) {
            messageTextarea.value = 'אני מעוניין/ת לקבל הצעת מחיר מפורטת לפרויקט דומה.\n\n';
        }
    }
}

function initializeMSFormsIntegration() {
    // Microsoft Forms integration will be set up here
    const msFormsSection = document.querySelector('.microsoft-forms-integration');
    
    if (msFormsSection) {
        // Add event listeners for MS Forms buttons
        const embedButton = msFormsSection.querySelector('.btn-secondary');
        if (embedButton) {
            embedButton.addEventListener('click', embedMSForm);
        }
    }
}

function embedMSForm() {
    const embedContainer = document.getElementById('ms-forms-embed');
    const iframe = document.getElementById('ms-forms-iframe');
    
    if (embedContainer && iframe) {
        // In a real implementation, replace with actual Microsoft Forms URL
        const formsUrl = 'https://forms.office.com/Pages/ResponsePage.aspx?id=YOUR_FORM_ID';
        
        iframe.src = formsUrl;
        embedContainer.style.display = 'block';
        
        // Scroll to the embedded form
        embedContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        CatalogUtils.showNotification('טופס Microsoft Forms נטען בהצלחה', 'success');
    }
}

// Global function for MS Forms integration
window.embedMSForm = embedMSForm;

// Add CSS for contact form enhancements
const contactCSS = `
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #333;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.8rem;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        font-family: inherit;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-color: #e74c3c;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
    }
    
    .field-error {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
    }
    
    .field-error:before {
        content: '⚠️';
        margin-left: 0.5rem;
    }
    
    .character-counter {
        text-align: left;
        font-size: 0.85rem;
        margin-top: 0.5rem;
        color: #666;
    }
    
    .character-counter.warning {
        color: #f39c12;
    }
    
    .character-counter.good {
        color: #27ae60;
    }
    
    .checkbox-group {
        display: flex;
        align-items: flex-start;
        gap: 0.8rem;
    }
    
    .checkbox-label {
        display: flex !important;
        align-items: flex-start;
        gap: 0.8rem;
        cursor: pointer;
        line-height: 1.5;
    }
    
    .checkbox-label input[type="checkbox"] {
        width: auto !important;
        margin: 0;
    }
    
    .form-submit-btn {
        width: 100%;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        margin-top: 1rem;
    }
    
    .contact-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin: 3rem 0;
    }
    
    .contact-card {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    
    .contact-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    
    .contact-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }
    
    .contact-card h3 {
        margin-bottom: 1rem;
        color: #333;
    }
    
    .contact-card p {
        color: #666;
        line-height: 1.6;
    }
    
    .contact-methods {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
    }
    
    .contact-method {
        text-align: center;
        padding: 1.5rem;
        background: white;
        border-radius: 10px;
        box-shadow: 0 3px 15px rgba(0,0,0,0.1);
    }
    
    .method-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
    }
    
    .contact-method h4 {
        margin-bottom: 0.5rem;
        color: #333;
    }
    
    .contact-method p {
        color: #666;
        font-weight: 500;
    }
    
    .forms-card {
        background: linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        margin: 3rem 0;
    }
    
    .forms-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin: 2rem 0;
        flex-wrap: wrap;
    }
    
    .forms-embed-container {
        margin-top: 2rem;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
    
    .follow-up-options {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        margin: 2rem 0;
    }
    
    .follow-up-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 1.5rem;
        flex-wrap: wrap;
    }
    
    .follow-up-actions .btn {
        background: white;
        color: #667eea;
        border: none;
    }
    
    .follow-up-actions .btn:hover {
        background: #f8f9fa;
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .forms-buttons {
            flex-direction: column;
            align-items: center;
        }
        
        .forms-buttons .btn {
            width: 100%;
            max-width: 300px;
        }
        
        .follow-up-actions {
            flex-direction: column;
        }
        
        .contact-methods {
            grid-template-columns: 1fr;
        }
    }
`;

// Add the CSS to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = contactCSS;
document.head.appendChild(styleSheet);