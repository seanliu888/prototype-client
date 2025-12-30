// Site Settings页面交互功能
console.log('site-settings.js 文件已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件已触发');
    
    // 颜色选择器同步
    const colorPickers = document.querySelectorAll('.color-picker');
    const colorHexInputs = document.querySelectorAll('.color-hex-input');
    
    colorPickers.forEach((picker, index) => {
        const hexInput = colorHexInputs[index];
        if (hexInput) {
            // 颜色选择器变化时更新hex输入框
            picker.addEventListener('input', function() {
                hexInput.value = this.value.toUpperCase();
                updatePreview();
            });
            
            // hex输入框变化时更新颜色选择器
            hexInput.addEventListener('input', function() {
                if (/^#[0-9A-F]{6}$/i.test(this.value)) {
                    picker.value = this.value;
                    updatePreview();
                }
            });
        }
    });
    
    // 文本输入框变化时更新预览
    const bannerTextInput = document.querySelector('.settings-section:nth-of-type(3) .settings-input');
    if (bannerTextInput) {
        bannerTextInput.addEventListener('input', function() {
            const previewText = document.getElementById('previewBannerText');
            if (previewText) {
                previewText.textContent = this.value || 'Say hello to wallet roaming data friendly';
            }
        });
    }
    
    // 文件上传
    const logoUpload = document.getElementById('logoUpload');
    const bannerUpload = document.getElementById('bannerUpload');
    
    if (logoUpload) {
        logoUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const status = this.nextElementSibling.nextElementSibling;
                if (status) {
                    status.textContent = file.name;
                }
                // 这里可以添加预览logo的逻辑
            }
        });
    }
    
    if (bannerUpload) {
        bannerUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const status = this.nextElementSibling.nextElementSibling;
                if (status) {
                    status.textContent = file.name;
                }
                
                // 预览banner图片
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewImage = document.getElementById('previewBannerImage');
                    if (previewImage) {
                        previewImage.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 12px;">`;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // 更新预览
    function updatePreview() {
        // 获取所有颜色值
        const themeColor = document.querySelector('.settings-section:nth-of-type(1) .color-picker:nth-of-type(1)')?.value || '#ff6b9d';
        const bannerBgColor = document.querySelector('.settings-section:nth-of-type(3) .color-picker:nth-of-type(1)')?.value || '#FFFFFF';
        const bannerTextColor = document.querySelector('.settings-section:nth-of-type(3) .color-picker:nth-of-type(2)')?.value || '#333333';
        const mainBgColor = document.querySelector('.settings-section:nth-of-type(4) .color-picker:nth-of-type(1)')?.value || '#FFFFFF';
        const mainTextColor = document.querySelector('.settings-section:nth-of-type(4) .color-picker:nth-of-type(2)')?.value || '#333333';
        const footerBgColor = document.querySelector('.settings-section:nth-of-type(5) .color-picker:nth-of-type(1)')?.value || '#FFFFFF';
        const footerTextColor = document.querySelector('.settings-section:nth-of-type(5) .color-picker:nth-of-type(2)')?.value || '#333333';
        
        // 更新预览区域
        const previewHero = document.getElementById('previewHero');
        if (previewHero) {
            previewHero.style.backgroundColor = bannerBgColor;
        }
        
        const previewBannerText = document.getElementById('previewBannerText');
        if (previewBannerText) {
            previewBannerText.style.color = bannerTextColor;
        }
        
        const previewContent = document.querySelector('.preview-content');
        if (previewContent) {
            previewContent.style.backgroundColor = mainBgColor;
            previewContent.style.color = mainTextColor;
        }
        
        // 更新按钮颜色
        const previewLoginBtn = document.querySelector('.preview-login-btn');
        if (previewLoginBtn) {
            previewLoginBtn.style.backgroundColor = themeColor;
        }
        
        const previewSeeMoreBtn = document.querySelector('.preview-see-more-btn');
        if (previewSeeMoreBtn) {
            previewSeeMoreBtn.style.backgroundColor = themeColor;
        }
        
        const previewToggle = document.querySelector('.preview-toggle.active');
        if (previewToggle) {
            previewToggle.style.backgroundColor = themeColor;
            previewToggle.style.borderColor = themeColor;
        }
    }
    
    // Done按钮
    const doneBtn = document.querySelector('.settings-done-btn');
    if (doneBtn) {
        doneBtn.addEventListener('click', function() {
            console.log('保存设置');
            alert('设置已保存！');
        });
    }
    
    // 初始化预览
    updatePreview();
    
    console.log('所有事件监听器已设置完成');
});



