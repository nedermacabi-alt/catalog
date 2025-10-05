// About page JavaScript - handles service pills interaction

document.addEventListener('DOMContentLoaded', function() {
    initializeServicePills();
});

// Service information database
const serviceInfo = {
    // Learning Products
    'interactive-module': {
        title: 'לומדה אינטראקטיבית',
        description: 'מודולי למידה דיגיטליים המשלבים תוכן מולטימדיה, אינטראקטיביות ומשוב מיידי לחוויית למידה מרתקת ויעילה.',
        features: [
            'תוכן מולטימדיה עשיר (וידאו, אודיו, אנימציות)',
            'אינטראקטיביות מתקדמת עם משוב מיידי', 
            'מעקב אחר התקדמות הלומד',
            'התאמה אישית לקצב הלמידה',
            'ממשק משתמש אינטואיטיבי ונגיש'
        ],
        useCases: ['הדרכות עובדים', 'קורסי השתלמות', 'חינוך רפואי', 'הדרכה בטיחותית'],
        duration: '4-8 שבועות פיתוח',
        technologies: 'HTML5, JavaScript, CSS3, אנימציות CSS/JS'
    },
    'digital-guide': {
        title: 'מדריך דיגיטלי',
        description: 'מדריכים דיגיטליים אינטראקטיביים המספקים הנחיות צעד אחר צעד עם הדגמות ויזואליות וכלי עזר דיגיטליים.',
        features: [
            'ניווט אינטואיטיבי בין פרקים',
            'חיפוש מתקדם בתוכן',
            'הדגמות ויזואליות אינטראקטיביות',
            'רשימות משימות וצ\'קליסטים',
            'אפשרות להדפסה או שמירה'
        ],
        useCases: ['מדריכי תפעול', 'נהלי עבודה', 'הוראות התקנה', 'מדריכי שימוש במערכות'],
        duration: '3-6 שבועות פיתוח',
        technologies: 'Progressive Web App, מנוע חיפוש מובנה'
    },
    'interactive-catalog': {
        title: 'קטלוג אינטראקטיבי',
        description: 'קטלוגים דיגיטליים עם אפשרויות סינון, חיפוש ועיון מתקדמות, הכוללים גלריות תמונות, וידאו הסבר ומידע מפורט.',
        features: [
            'מערכת סינון וחיפוש מתקדמת',
            'גלריות תמונות אינטראקטיביות',
            'מידע מפורט על כל פריט',
            'השוואה בין פריטים',
            'אינטגרציה עם מערכות הזמנות'
        ],
        useCases: ['קטלוגי מוצרים', 'גלריות אמנות', 'מאגרי ידע', 'ספריות דיגיטליות'],
        duration: '6-10 שבועות פיתוח',
        technologies: 'מסד נתונים, API, ממשק ניהול תוכן'
    },
    'quiz-trivia': {
        title: 'חידון/טריוויה',
        description: 'משחקי חידונים אינטראקטיביים עם מגוון סוגי שאלות, מערכת ניקוד, לוחות מובילים וניתוח ביצועים מפורט.',
        features: [
            'מגוון סוגי שאלות (בחירה, פתוחות, גרירה)',
            'מערכת ניקוד והישגים',
            'לוחות מובילים (Leaderboards)',
            'ניתוח ביצועים ודוחות',
            'מצבי משחק שונים (פרטי/קבוצתי)'
        ],
        useCases: ['הכשרות מקצועיות', 'חידונים חינוכיים', 'אירועי חברה', 'בדיקות ידע'],
        duration: '4-7 שבועות פיתוח',
        technologies: 'מנוע משחקים, מסד נתונים, ניתוח נתונים'
    },
    'escape-room': {
        title: 'חדר בריחה דיגיטלי',
        description: 'חוויית למידה גמיפיקציה המשלבת פתרון חידות וחשיבה יצירתית עם רכישת ידע בצורה מרתקת ואינטראקטיבית.',
        features: [
            'עלילה מרתקת ואווירה קולנועית',
            'חידות מגוונות ואתגרים לוגיים',
            'מערכת רמזים מתקדמת',
            'אפקטים קוליים וויזואליים',
            'מעקב אחר התקדמות בזמן אמת'
        ],
        useCases: ['הדרכות בטיחות', 'למידה בצוותים', 'אירועי גיבוש', 'חינוך מדעי'],
        duration: '8-12 שבועות פיתוח',
        technologies: 'מנוע משחקים מתקדם, אפקטים דיגיטליים, מולטימדיה'
    },
    'memory-game': {
        title: 'משחק זיכרון',
        description: 'משחקי זיכרון אינטראקטיביים המחזקים זכירה ורכישת ידע באמצעות אתגרים מהנים ומערכת התקדמות מותאמת.',
        features: [
            'רמות קושי מתדרגות',
            'תוכן חזותי ואודיו מרתק',
            'מערכת פרסים והישגים',
            'התאמה אישית לגילאים שונים',
            'מעקב אחר שיפור הביצועים'
        ],
        useCases: ['לימוד שפות', 'זכירת מונחים מקצועיים', 'אימון קוגניטיבי', 'חינוך מיוחד'],
        duration: '3-5 שבועות פיתוח',
        technologies: 'אלגוריתמי למידה, אנימציות, מעקב התקדמות'
    },
    'matching-game': {
        title: 'משחק התאמות',
        description: 'משחקים אינטראקטיביים לחיבור בין מושגים, תמונות או רעיונות, המפתחים חשיבה אסוציאטיבית ומחזקים הבנה.',
        features: [
            'ממשק גרירה ושחרור אינטואיטיבי',
            'משוב ויזואלי מיידי',
            'מגוון סוגי התאמות',
            'רמות קושי מותאמות',
            'ניתוח דפוסי למידה'
        ],
        useCases: ['למידת מילים חדשות', 'התאמת תהליכים', 'זיהוי דפוסים', 'קטגוריזציה'],
        duration: '3-6 שבועות פיתוח',
        technologies: 'Drag & Drop API, אלגוריתמי התאמה, UI/UX מתקדם'
    },
    'learning-journey': {
        title: 'מסע למידה (Learning Journey)',
        description: 'מסלולי למידה מותאמים אישית עם מעקב התקדמות, הישגים אישיים ונתיבי למידה גמישים המתאימים לכל לומד.',
        features: [
            'מפת למידה ויזואלית',
            'התאמה אישית לצרכי הלומד',
            'מעקב התקדמות מפורט',
            'מערכת הישגים ותגמולים',
            'נתוני למידה ואנליטיקה'
        ],
        useCases: ['תוכניות הכשרה ארוכות', 'פיתוח קריירה', 'למידה עצמאית', 'הכשרות מתמשכות'],
        duration: '10-16 שבועות פיתוח',
        technologies: 'Learning Management System, בינה מלאכותית, אנליטיקה מתקדמת'
    },
    'decision-simulator': {
        title: 'סימולטור החלטות',
        description: 'סימולציות אינטראקטיביות המאפשרות תרגול קבלת החלטות במצבים מורכבים עם משוב מיידי על ההשלכות.',
        features: [
            'תרחישים מורכבים ומציאותיים',
            'עץ החלטות מתפרץ',
            'השלכות מיידיות וארוכות טווח',
            'ניתוח החלטות ומשוב מפורט',
            'למידה מטעויות'
        ],
        useCases: ['הדרכות ניהול', 'הכשרות רפואיות', 'סימולציות עסקיות', 'הכשרות בטיחות'],
        duration: '8-14 שבועות פיתוח',
        technologies: 'מנוע סימולציה, בינה מלאכותית, מערכות מומחה'
    },

    // Video Production
    'green-studio': {
        title: 'אולפן ירוק (Green Screen)',
        description: 'הפקות וידאו מקצועיות באולפן ירוק עם רקעים וירטואליים מתקדמים, המאפשרות יצירת תוכן מרהיב בכל סביבה רצויה.',
        features: [
            'אולפן מקצועי עם תאורה מושלמת',
            'ביגוד ואבזרים מתאימים',
            'רקעים וירטואליים מותאמים אישית',
            'עריכה מקצועית ואפקטים ויזואליים',
            'פלטפורמות הקרנה מגוונות'
        ],
        useCases: ['הדרכות עובדים', 'מצגות עסקיות', 'תוכן שיווקי', 'הדרכות בטיחות'],
        duration: '2-4 שבועות הפקה',
        technologies: 'Chroma Key, עריכת וידאו מקצועית, אפקטים ויזואליים'
    },
    'screencast': {
        title: 'סרטון סמן (Screencast)',
        description: 'הקלטות מסך מקצועיות עם הסבר קולי איכותי, המדגימות שימוש במערכות ותוכנות בצורה ברורה ומובנת.',
        features: [
            'הקלטת מסך איכותית ברזולוציה גבוהה',
            'הסבר קולי מקצועי',
            'הדגשים ויזואליים ואנימציות הסבר',
            'עריכה מדויקת וחיתוכים חלקים',
            'כתוביות בעברית או אנגלית'
        ],
        useCases: ['הדרכות תוכנה', 'מדריכי שימוש', 'הדגמות מוצרים', 'הכשרות טכנולוגיות'],
        duration: '1-3 שבועות הפקה',
        technologies: 'הקלטת מסך מתקדמת, עיבוד אודיו, עריכת וידאו'
    },
    'motion-graphics': {
        title: 'אנימציה ומושן גרפיקס',
        description: 'סרטוני אנימציה מתקדמים המשלבים גרפיקה דינמית, אפקטים ויזואליים וסטוריטלינג ליצירת תוכן מרשים וזכיר.',
        features: [
            'אנימציה דו-ממדית ותלת-ממדית',
            'עיצוב גרафי מקצועי ומותאם למותג',
            'אפקטים ויזואליים מתקדמים',
            'סאונד דיזיין וליווי מוזיקלי',
            'סטוריבורד מפורט ותכנון מדויק'
        ],
        useCases: ['הסברים מורכבים', 'תוכן שיווקי', 'הדגמות מדעיות', 'אנימציות לימודיות'],
        duration: '6-12 שבועות הפקה',
        technologies: 'After Effects, Cinema 4D, אנימציה מתקדמת, עיצוב גרפי'
    },
    'scenario-video': {
        title: 'סרטון תרחיש מצולם',
        description: 'סרטונים מצולמים המדגימים מצבים מעשיים ותרחישים מציאותיים, עם שחקנים מקצועיים ותפאורה אותנטית.',
        features: [
            'תסריט מקצועי ומותאם לצרכים',
            'שחקנים מקצועיים ומנוסים',
            'צילום באיכות קולנועית',
            'עריכה דרמטית ודינמית',
            'הפקה שלמה מתכנון ועד למוצר הסופי'
        ],
        useCases: ['הדרכות שירות לקוחות', 'תרחישי בטיחות', 'סימולציות מקצועיות', 'דילמות אתיות'],
        duration: '4-8 שבועות הפקה',
        technologies: 'ציוד צילום מקצועי, הפקה קולנועית, עריכת וידאו מתקדמת'
    },
    'interactive-video': {
        title: 'וידאו אינטראקטיבי',
        description: 'סרטונים המאפשרים לצופים להשפיע על העלילה ולקבל החלטות במהלך הצפייה, ליצירת חוויה מותאמת אישית.',
        features: [
            'נקודות החלטה אינטראקטיביות',
            'מסלולי עלילה מרובים',
            'משוב מיידי על החלטות',
            'מעקב אחר בחירות המשתמש',
            'אנליטיקה מפורטת של התנהגות צופים'
        ],
        useCases: ['הדרכות קבלת החלטות', 'סימולציות מקצועיות', 'תוכן חינוכי מתקדם', 'משחקים לימודיים'],
        duration: '8-16 שבועות הפקה',
        technologies: 'פלטפורמת וידאו אינטראקטיבי, ענפי החלטות, אנליטיקה'
    },
    'hybrid-content': {
        title: 'שילוב צילום ואנימציה',
        description: 'תוכן יברידי המשלב צילום מציאותי עם אנימציות ואפקטים דיגיטליים ליצירת חוויה ויזואלית ייחודית ומרשימה.',
        features: [
            'שילוב חלק בין צילום לאנימציה',
            'אפקטים ויזואליים מתקדמים',
            'התאמה מושלמת של תאורה וצבעים',
            'אנימציות דו וות-מימדיות משולבות',
            'פוסט-פרודקשן מקצועי'
        ],
        useCases: ['הסברים מדעיים מורכבים', 'תוכן פנטזיה או מדע בדיוני', 'הדגמות טכנולוגיות', 'תוכן חדשנית'],
        duration: '10-20 שבועות הפקה',
        technologies: 'Visual Effects, Motion Tracking, Compositing, אנימציה תלת-ממדית'
    }
};

function initializeServicePills() {
    const pills = document.querySelectorAll('.pill[data-type]');
    const infoCard = document.getElementById('service-info');
    
    pills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            pills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            this.classList.add('active');
            
            // Get service info
            const serviceType = this.getAttribute('data-type');
            const service = serviceInfo[serviceType];
            
            if (service && infoCard) {
                displayServiceInfo(service, infoCard);
            }
        });
    });
}

function displayServiceInfo(service, container) {
    container.innerHTML = `
        <h3>${service.title}</h3>
        <p class="service-description">${service.description}</p>
        
        <div class="service-details">
            <div class="service-section">
                <h4>תכונות עיקריות:</h4>
                <ul class="features-list">
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="service-section">
                <h4>שימושים מומלצים:</h4>
                <div class="use-cases">
                    ${service.useCases.map(useCase => `<span class="use-case-tag">${useCase}</span>`).join('')}
                </div>
            </div>
            
            <div class="service-meta">
                <div class="meta-item">
                    <strong>זמן פיתוח משוער:</strong> ${service.duration}
                </div>
                <div class="meta-item">
                    <strong>טכנולוגיות:</strong> ${service.technologies}
                </div>
            </div>
        </div>
        
        <div class="service-actions">
            <button class="btn btn-primary" onclick="requestQuote('${service.title}')">בקש הצעת מחיר</button>
            <button class="btn btn-secondary" onclick="viewExamples('${service.title}')">צפה בדוגמאות</button>
        </div>
    `;
    
    // Add animation
    container.classList.add('fade-in');
    setTimeout(() => container.classList.remove('fade-in'), 600);
}

function requestQuote(serviceTitle) {
    // Redirect to contact form with pre-filled service type
    const encodedService = encodeURIComponent(serviceTitle);
    window.location.href = `contact.html?service=${encodedService}`;
}

function viewExamples(serviceTitle) {
    // Redirect to gallery with filter
    const encodedService = encodeURIComponent(serviceTitle);
    window.location.href = `gallery.html?filter=${encodedService}`;
}

// Add CSS for the new elements
const additionalCSS = `
    .service-description {
        margin: 1rem 0;
        line-height: 1.7;
        color: #555;
    }
    
    .service-details {
        margin: 2rem 0;
    }
    
    .service-section {
        margin: 1.5rem 0;
    }
    
    .service-section h4 {
        color: #333;
        margin-bottom: 0.8rem;
        font-weight: 600;
    }
    
    .features-list {
        list-style: none;
        padding: 0;
    }
    
    .features-list li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-right: 1.5rem;
    }
    
    .features-list li:before {
        content: '✓';
        position: absolute;
        right: 0;
        color: #667eea;
        font-weight: bold;
    }
    
    .use-cases {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .use-case-tag {
        background: linear-gradient(135deg, #f1f3f4, #e8eaed);
        color: #333;
        padding: 0.4rem 0.8rem;
        border-radius: 15px;
        font-size: 0.85rem;
        font-weight: 500;
    }
    
    .service-meta {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        margin: 1.5rem 0;
    }
    
    .meta-item {
        margin: 0.5rem 0;
        line-height: 1.6;
    }
    
    .service-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
        .service-actions {
            flex-direction: column;
        }
        
        .service-actions .btn {
            width: 100%;
        }
    }
`;

// Add the CSS to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);