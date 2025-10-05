// Example detail page JavaScript - handles dynamic content loading

document.addEventListener('DOMContentLoaded', function() {
    loadExampleDetails();
    initializeExampleActions();
});

// Example database (in a real app, this would come from a server/API)
const examplesDatabase = {
    'interactive-module-1': {
        title: 'לומדה בנושא בטיחות במעבדה',
        category: 'learning',
        description: 'מודול למידה אינטראקטיבי המלמד כללי בטיחות במעבדה באמצעות סימולציות וחידונים מתקדמים. המערכת כוללת מעקב אחר התקדמות הלומד ומתאימה את התוכן לקצב הלמידה האישי.',
        image: 'לומדה אינטראקטיבית - בטיחות במעבדה',
        tags: ['לומדה אינטראקטיבית', 'בטיחות', 'סימולציה', 'מעבדה'],
        features: [
            'סימולציות תלת-ממדיות של מעבדה אמיתית',
            'מערכת התרעות על סכנות פוטנציאליות',
            'חידונים אינטראקטיביים עם משוב מיידי',
            'מעקב אחר התקדמות אישית',
            'תעודת סיום מותאמת אישית',
            'תמיכה במכשירים ניידים'
        ],
        technicalSpecs: {
            'פלטפורמה': 'Web-based (HTML5, JavaScript)',
            'דפדפנים נתמכים': 'Chrome, Firefox, Safari, Edge',
            'זמן למידה משוער': '45-60 דקות',
            'שפות זמינות': 'עברית, אנגלית',
            'גישה': 'Responsive design לכל המכשירים',
            'אבטחה': 'SSL encryption, GDPR compliant'
        },
        client: 'אוניברסיטת תל אביב - הפקולטה למדעים מדויקים',
        duration: '6 שבועות פיתוח',
        year: '2024'
    },
    'digital-guide-1': {
        title: 'מדריך שימוש במערכת CRM',
        category: 'learning',
        description: 'מדריך דיגיטלי מקיף לשימוש במערכת ניהול לקוחות (CRM) עם הדגמות אינטראקטיביות צעד אחר צעד. המדריך כולל סרטוני הדגמה, תרגילי תרגול ומערכת חיפוש מתקדמת.',
        image: 'מדריך דיגיטלי - CRM',
        tags: ['מדריך דיגיטלי', 'CRM', 'הדרכה', 'מערכות מידע'],
        features: [
            'ניווט אינטואיטיבי בין פרקים',
            'מערכת חיפוש מתקדמת בתוכן',
            'סרטוני הדגמה אינטראקטיביים',
            'תרגילי תרגול מעשיים',
            'רשימות בדיקה (Checklists)',
            'אפשרות הורדה לצפייה אופליין'
        ],
        technicalSpecs: {
            'פלטפורמה': 'Progressive Web App (PWA)',
            'טכנולוגיות': 'React, Node.js, MongoDB',
            'זמן למידה משוער': '2-3 שעות',
            'עדכונים': 'אוטומטיים בזמן אמת',
            'גישה': 'Multi-device sync',
            'אבטחה': 'Role-based access control'
        },
        client: 'חברת סיילספורס ישראל',
        duration: '4 שבועות פיתוח',
        year: '2024'
    },
    'quiz-1': {
        title: 'חידון היסטוריה של ישראל',
        category: 'learning',
        description: 'חידון אינטראקטיבי מקיף בהיסטוריה של ישראל הכולל תמונות היסטוריות, סרטונים נדירים ומערכת ניקוד מתקדמת. החידון מותאם לרמות ידע שונות ומספק הסבר מפורט לכל תשובה.',
        image: 'חידון אינטראקטיבי - היסטוריה',
        tags: ['חידון', 'היסטוריה', 'טריוויה', 'חינוך'],
        features: [
            'בנק שאלות עשיר עם מעל 500 שאלות',
            'תמונות ווידאו היסטוריים אותנטיים',
            'מערכת רמות קושי מתקדמת',
            'הסברים מפורטים לכל תשובה',
            'לוח מובילים ותחרות חברתית',
            'תעודת הישגים אישית'
        ],
        technicalSpecs: {
            'פלטפורמה': 'Cross-platform web application',
            'מסד נתונים': 'Cloud-based question bank',
            'זמן משחק': '15-45 דקות (לפי בחירה)',
            'שחקנים': '1-4 שחקנים במשחק אחד',
            'התאמה': 'Adaptive difficulty system',
            'אנליטיקה': 'מעקב מפורט אחר ביצועים'
        },
        client: 'משרד החינוך - מינהל חברה ונוער',
        duration: '5 שבועות פיתוח',
        year: '2023'
    },
    'green-studio-1': {
        title: 'הדרכה למוקד טלפוני',
        category: 'video',
        description: 'סדרת סרטוני הדרכה מקצועיים למוקד טלפוני, שנוצרו באולפן ירוק עם רקעים וירטואליים המדמים סביבת עבודה אמיתית. הסרטונים כוללים תרחישי שיחות מורכבים וטכניקות התמודדות מתקדמות.',
        image: 'סרטון אולפן ירוק - מוקד טלפוני',
        tags: ['אולפן ירוק', 'הדרכה', 'מוקד', 'שירות לקוחות'],
        features: [
            'צילום באולפן מקצועי עם תאורה מושלמת',
            'רקעים וירטואליים מציאותיים',
            'שחקנים מקצועיים ומנוסים',
            'תרחישי שיחות מגוונים',
            'כתוביות בעברית ובאנגלית',
            'אפשרויות צפייה מותאמות'
        ],
        technicalSpecs: {
            'איכות וידאו': '4K Ultra HD',
            'פורמטים': 'MP4, WebM, HLS streaming',
            'משך סרטון': '25 דקות (5 פרקים)',
            'גודל קובץ': '2.1 GB (4K), 850 MB (1080p)',
            'אופטימיזציה': 'CDN delivery, adaptive bitrate',
            'נגישות': 'כתוביות, תמלול מלא'
        },
        client: 'בנק הפועלים - מוקד שירות לקוחות',
        duration: '3 שבועות הפקה',
        year: '2024'
    },
    'screencast-1': {
        title: 'מדריך למערכת ההנהלת חשבונות',
        category: 'video',
        description: 'סדרת הקלטות מסך מפורטות המדגימות שימוש במערכת הנהלת החשבונות עם הסברים קוליים מקצועיים. המדריך כולל טיפים מעשיים ודרכי עבודה יעילות.',
        image: 'סרטון מסך - הנהלת חשבונות',
        tags: ['סרטון סמן', 'הנהח״ש', 'הדגמה', 'תוכנה'],
        features: [
            'הקלטת מסך ברזולוציה גבוהה',
            'הסבר קולי ברור ומובן',
            'הדגשים ויזואליים מתקדמים',
            'חלוקה לפרקים ונושאים',
            'אינדקס מפורט עם קישורים',
            'גרסאות מקוצרות לחזרה מהירה'
        ],
        technicalSpecs: {
            'איכות וידאו': '1080p Full HD',
            'פורמט': 'MP4 optimized',
            'משך כולל': '85 דקות (12 פרקים)',
            'גודל קובץ': '1.2 GB',
            'דחיסה': 'H.264 advanced compression',
            'תאימות': 'כל הפלטפורמות הנפוצות'
        },
        client: 'רשת רואי חשבון מובילה',
        duration: '2 שבועות הפקה',
        year: '2024'
    },
    'motion-graphics-1': {
        title: 'הסבר על תהליכי הגוף האנושי',
        category: 'video',
        description: 'סרטון אנימציה מדעי המציג את מערכת העצבים האנושית באמצעות גרפיקה תלת-מימדית מתקדמת. הסרטון משלב מדע מדויק עם ויזואליזציה מרהיבה.',
        image: 'אנימציה ומושן - מערכת עצבים',
        tags: ['אנימציה', 'מושן גרפיקס', 'ביולוגיה', 'מדע'],
        features: [
            'אנימציה תלת-ממדית מדויקת מבחינה מדעית',
            'ויזואליזציה של תהליכים מורכבים',
            'סאונד דיזיין מקצועי',
            'ליווי מוזיקלי מותאם',
            'גרפיקה וטקסט בעברית',
            'גרסאות באיכויות שונות'
        ],
        technicalSpecs: {
            'איכות וידאו': '4K Ultra HD',
            'טכנולוגיית אנימציה': '3D modeling & rendering',
            'משך סרטון': '12 דקות',
            'פורמטים': 'MP4, MOV, GIF highlights',
            'רנדור': '240 שעות render time',
            'תוכנות': 'Cinema 4D, After Effects, Premiere'
        },
        client: 'הפקולטה לרפואה - אוניברסיטה עברית',
        duration: '8 שבועות הפקה',
        year: '2023'
    }
};

function loadExampleDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const exampleId = urlParams.get('id');
    
    if (exampleId && examplesDatabase[exampleId]) {
        const example = examplesDatabase[exampleId];
        populateExampleData(example);
        loadSimilarExamples(example.category, exampleId);
    } else {
        showExampleNotFound();
    }
}

function populateExampleData(example) {
    // Update page title and breadcrumb
    document.title = `${example.title} - הקטלוג שלנו`;
    document.getElementById('example-title').textContent = example.title;
    document.getElementById('example-main-title').textContent = example.title;
    
    // Update image
    const imageEl = document.getElementById('example-image');
    imageEl.innerHTML = `<span>${example.image}</span>`;
    
    // Update description
    document.getElementById('example-description').innerHTML = `<p>${example.description}</p>`;
    
    // Update tags
    const tagsContainer = document.getElementById('example-tags-container');
    tagsContainer.innerHTML = example.tags.map(tag => 
        `<span class="example-tag">${tag}</span>`
    ).join('');
    
    // Update details
    const detailsContainer = document.getElementById('example-details');
    detailsContainer.innerHTML = `
        <div class="example-meta">
            <div class="meta-row">
                <span class="meta-label">לקוח:</span>
                <span class="meta-value">${example.client}</span>
            </div>
            <div class="meta-row">
                <span class="meta-label">משך פיתוח:</span>
                <span class="meta-value">${example.duration}</span>
            </div>
            <div class="meta-row">
                <span class="meta-label">שנת יצור:</span>
                <span class="meta-value">${example.year}</span>
            </div>
        </div>
    `;
    
    // Update features
    const featuresContainer = document.getElementById('example-features-list');
    featuresContainer.innerHTML = `
        <ul class="features-list">
            ${example.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    
    // Update technical specs
    const techContainer = document.getElementById('example-technical-specs');
    techContainer.innerHTML = `
        <div class="tech-specs-grid">
            ${Object.entries(example.technicalSpecs).map(([key, value]) => `
                <div class="tech-spec-item">
                    <div class="spec-label">${key}:</div>
                    <div class="spec-value">${value}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function loadSimilarExamples(category, currentId) {
    const similarContainer = document.getElementById('similar-examples-grid');
    const similarExamples = Object.entries(examplesDatabase)
        .filter(([id, example]) => example.category === category && id !== currentId)
        .slice(0, 3); // Show up to 3 similar examples
    
    if (similarExamples.length > 0) {
        similarContainer.innerHTML = similarExamples.map(([id, example]) => `
            <div class="similar-card" onclick="navigateToExample('${id}')">
                <div class="similar-image">
                    <span>${example.image}</span>
                </div>
                <h4>${example.title}</h4>
                <div class="similar-tags">
                    ${example.tags.slice(0, 2).map(tag => `<span class="similar-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    } else {
        similarContainer.innerHTML = '<p class="no-similar">אין דוגמאות דומות זמינות כרגע</p>';
    }
}

function navigateToExample(exampleId) {
    const example = examplesDatabase[exampleId];
    if (example) {
        window.location.href = `example.html?id=${exampleId}&category=${example.category}`;
    }
}

function showExampleNotFound() {
    document.querySelector('.example-detail').innerHTML = `
        <div class="example-not-found">
            <h2>הדוגמה לא נמצאה</h2>
            <p>מצטערים, הדוגמה שביקשתם אינה זמינה או שהקישור שגוי.</p>
            <a href="gallery.html" class="btn btn-primary">חזרה לגלריית הדוגמאות</a>
        </div>
    `;
}

function initializeExampleActions() {
    // Handle action buttons
    const actionButtons = document.querySelectorAll('.example-actions .btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            if (action === 'צפה בדוגמה') {
                handleViewExample();
            } else if (action === 'בקש הצעת מחיר') {
                handleRequestQuote();
            }
        });
    });
}

function handleViewExample() {
    // In a real application, this would open the actual example
    CatalogUtils.showNotification('פתיחת הדוגמה...', 'info');
    
    // Simulate loading
    setTimeout(() => {
        CatalogUtils.showNotification('הדוגמה תיפתח בלשונית חדשה (דמו)', 'success');
        // window.open('#demo-link', '_blank');
    }, 1000);
}

function handleRequestQuote() {
    const urlParams = new URLSearchParams(window.location.search);
    const exampleId = urlParams.get('id');
    const example = examplesDatabase[exampleId];
    
    if (example) {
        const encodedTitle = encodeURIComponent(example.title);
        window.location.href = `contact.html?service=${encodedTitle}&type=quote`;
    } else {
        window.location.href = 'contact.html?type=quote';
    }
}

// Add CSS for example detail page
const exampleDetailCSS = `
    .example-detail {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 1rem;
    }
    
    .example-hero {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        margin-bottom: 3rem;
    }
    
    .example-image-large .placeholder-image.large {
        height: 400px;
        font-size: 1.2rem;
    }
    
    .example-info h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #333;
    }
    
    .example-tags {
        margin: 1rem 0;
    }
    
    .example-tag {
        display: inline-block;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 0.5rem 1rem;
        margin: 0.25rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .example-description {
        margin: 1.5rem 0;
        line-height: 1.7;
        font-size: 1.1rem;
        color: #555;
    }
    
    .example-meta {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        margin: 2rem 0;
    }
    
    .meta-row {
        display: flex;
        justify-content: space-between;
        margin: 0.8rem 0;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .meta-row:last-child {
        border-bottom: none;
    }
    
    .meta-label {
        font-weight: 600;
        color: #333;
    }
    
    .meta-value {
        color: #666;
    }
    
    .example-actions {
        display: flex;
        gap: 1rem;
        margin: 2rem 0;
    }
    
    .features-list {
        list-style: none;
        padding: 0;
    }
    
    .features-list li {
        padding: 0.7rem 0;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-right: 2rem;
    }
    
    .features-list li:before {
        content: '✓';
        position: absolute;
        right: 0;
        color: #667eea;
        font-weight: bold;
        font-size: 1.2rem;
    }
    
    .tech-specs-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }
    
    .tech-spec-item {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 8px;
        border-right: 4px solid #667eea;
    }
    
    .spec-label {
        font-weight: 600;
        color: #333;
        margin-bottom: 0.5rem;
    }
    
    .spec-value {
        color: #666;
        line-height: 1.5;
    }
    
    .similar-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
    }
    
    .similar-card {
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .similar-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .similar-image {
        height: 150px;
        background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        font-weight: 500;
    }
    
    .similar-card h4 {
        padding: 1rem;
        margin: 0;
        font-size: 1.1rem;
        color: #333;
    }
    
    .similar-tags {
        padding: 0 1rem 1rem;
    }
    
    .similar-tag {
        display: inline-block;
        background: #f1f3f4;
        color: #666;
        padding: 0.3rem 0.6rem;
        margin: 0.2rem;
        border-radius: 12px;
        font-size: 0.8rem;
    }
    
    .breadcrumb {
        margin-bottom: 2rem;
        color: #666;
    }
    
    .breadcrumb a {
        color: #667eea;
        text-decoration: none;
    }
    
    .breadcrumb a:hover {
        text-decoration: underline;
    }
    
    .current-page {
        color: #333;
        font-weight: 500;
    }
    
    .back-to-gallery {
        text-align: center;
        margin: 3rem 0;
    }
    
    .example-not-found {
        text-align: center;
        padding: 4rem 2rem;
    }
    
    .no-similar {
        text-align: center;
        color: #999;
        font-style: italic;
        padding: 2rem;
    }
    
    @media (max-width: 768px) {
        .example-hero {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .example-info h1 {
            font-size: 2rem;
        }
        
        .example-actions {
            flex-direction: column;
        }
        
        .tech-specs-grid {
            grid-template-columns: 1fr;
        }
        
        .similar-grid {
            grid-template-columns: 1fr;
        }
    }
`;

// Add the CSS to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = exampleDetailCSS;
document.head.appendChild(styleSheet);