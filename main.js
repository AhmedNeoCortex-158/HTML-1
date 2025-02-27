// انتظر تحميل DOM بالكامل
document.addEventListener("DOMContentLoaded", function() {

    /* 
      Lazy Loading للصور:
      قم بتعليم الصور التي ترغب بتحميلها عند الظهور على الصفحة بالفئة "lazy"
      وضع عنوان الصورة الأصلي في الخاصية data-src.
    */
    const lazyImages = document.querySelectorAll('img.lazy');
  
    if ('IntersectionObserver' in window) {
      let lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;  // تعيين المصدر الأصلي
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      }, {
        rootMargin: "0px 0px 50px 0px",  // تحميل قبل ظهور الصورة قليلاً
        threshold: 0.01
      });
  
      lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
      });
    } else {
      // في حالة عدم دعم المتصفح للـ IntersectionObserver، يتم تحميل جميع الصور فوراً.
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  
    /*
      دالة Debounce:
      تمنع استدعاء دالة معينة بشكل متكرر خلال فترة زمنية قصيرة.
    */
    function debounce(func, wait, immediate) {
      let timeout;
      return function() {
        const context = this, args = arguments;
        const later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  
    // مثال على استخدام Debounce مع حدث التمرير لتحسين الأداء
    window.addEventListener('scroll', debounce(function() {
      // يمكن هنا تنفيذ وظائف تتعلق بالتمرير، مثل تفعيل تأثيرات أو تحديث عناصر معينة.
      console.log("التمرير عند: " + window.scrollY + " بكسل");
    }, 200));
  
    /* 
      تحسين تجربة المستخدم: 
      يمكنك إضافة تحسينات إضافية مثل استخدام requestAnimationFrame لتحديث الرسوميات أو التأثيرات.
      مثال بسيط:
    */
    function animateOnScroll() {
      window.requestAnimationFrame(() => {
        // قم بتحديث تأثيرات أو خصائص بناءً على موضع التمرير
        // هنا مثال لتغيير شفافية عنصر (يمكنك تخصيصه حسب الحاجة)
        const hero = document.querySelector('.hero');
        if (hero) {
          let scrollPos = window.scrollY;
          let newOpacity = Math.max(1 - scrollPos / 400, 0.5);
          hero.style.opacity = newOpacity;
        }
      });
    }
  
    window.addEventListener('scroll', debounce(animateOnScroll, 50));
  
  });
  