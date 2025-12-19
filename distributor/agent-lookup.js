// Reseller页面交互功能
console.log('agent-lookup.js 文件已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件已触发');
    
    // 操作下拉菜单
    const actionMenuBtns = document.querySelectorAll('.action-menu-btn');
    const actionMenus = document.querySelectorAll('.action-menu');
    
    console.log('找到操作按钮数量:', actionMenuBtns.length);
    
    actionMenuBtns.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('点击了操作按钮', index);
            
            // 关闭所有其他菜单
            actionMenus.forEach((menu, menuIndex) => {
                if (menuIndex !== index) {
                    menu.parentElement.classList.remove('active');
                }
            });
            
            // 切换当前菜单
            const dropdown = this.closest('.action-dropdown');
            if (dropdown) {
                dropdown.classList.toggle('active');
                console.log('菜单状态:', dropdown.classList.contains('active'));
            }
        });
    });
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.action-dropdown')) {
            actionMenus.forEach(menu => {
                menu.parentElement.classList.remove('active');
            });
        }
    });
    
    // 添加经销商按钮
    const addResellerBtn = document.querySelector('.add-reseller-btn');
    const addResellerModal = document.getElementById('addResellerModal');
    const closeAddResellerModalBtn = document.getElementById('closeAddResellerModal');
    const resellerModalTitle = document.getElementById('resellerModalTitle');
    const submitResellerBtn = document.getElementById('submitResellerBtn');
    const addResellerForm = document.getElementById('addResellerForm');
    
    console.log('Add按钮:', addResellerBtn);
    console.log('Add弹窗:', addResellerModal);
    
    if (addResellerBtn) {
        addResellerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('点击了Add按钮');
            
            // 重置为添加模式
            if (addResellerForm) {
                addResellerForm.reset();
            }
            if (resellerModalTitle) {
                resellerModalTitle.textContent = 'Add a reseller';
            }
            if (submitResellerBtn) {
                submitResellerBtn.textContent = 'Add Reseller';
            }
            if (addResellerModal) {
                addResellerModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('弹窗已打开');
            }
        });
    } else {
        console.error('未找到Add按钮');
    }
    
    // 编辑按钮点击事件
    const editItems = document.querySelectorAll('.edit-item');
    const resellerNameInput = document.getElementById('resellerName');
    const resellerEmailInput = document.getElementById('resellerEmail');
    const resellerCountryCodeSelect = document.getElementById('resellerCountryCode');
    const resellerPhoneInput = document.getElementById('resellerPhone');
    const resellerRebateInput = document.getElementById('resellerRebate');
    let isEditMode = false;
    let currentEditRow = null;
    
    console.log('找到Edit按钮数量:', editItems.length);
    
    editItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('点击了Edit按钮');
            
            // 关闭操作下拉菜单
            const dropdown = this.closest('.action-dropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
            
            // 获取行数据
            const row = this.closest('tr');
            const name = row.getAttribute('data-name');
            const email = row.getAttribute('data-email');
            const countryCode = row.getAttribute('data-phone');
            const phoneNumber = row.getAttribute('data-phone-number');
            const rebate = row.getAttribute('data-rebate');
            
            console.log('行数据:', { name, email, countryCode, phoneNumber, rebate });
            
            // 填充表单
            if (resellerNameInput) resellerNameInput.value = name || '';
            if (resellerEmailInput) resellerEmailInput.value = email || '';
            if (resellerCountryCodeSelect) resellerCountryCodeSelect.value = countryCode || '+1';
            if (resellerPhoneInput) resellerPhoneInput.value = phoneNumber || '';
            if (resellerRebateInput) resellerRebateInput.value = rebate || '';
            
            // 切换到编辑模式
            isEditMode = true;
            currentEditRow = row;
            if (resellerModalTitle) resellerModalTitle.textContent = 'Edit Reseller';
            if (submitResellerBtn) submitResellerBtn.textContent = 'Update Reseller';
            
            // 打开弹窗
            if (addResellerModal) {
                addResellerModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('编辑弹窗已打开');
            }
        });
    });
    
    // 添加业务员表单提交
    if (addResellerForm) {
        addResellerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = resellerNameInput ? resellerNameInput.value : '';
            const email = resellerEmailInput ? resellerEmailInput.value : '';
            const countryCode = resellerCountryCodeSelect ? resellerCountryCodeSelect.value : '+1';
            const phone = resellerPhoneInput ? resellerPhoneInput.value : '';
            const rebate = resellerRebateInput ? resellerRebateInput.value : '';
            
            if (isEditMode) {
                // 编辑模式：更新行数据
                console.log('更新业务员:', {
                    name: name,
                    email: email,
                    phone: countryCode + phone,
                    rebate: rebate
                });
                
                // 更新表格行
                if (currentEditRow) {
                    const cells = currentEditRow.querySelectorAll('td');
                    if (cells.length >= 5) {
                        cells[1].textContent = name;
                        cells[2].textContent = email;
                        cells[3].textContent = countryCode + ' ' + phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                        cells[4].textContent = rebate + '%';
                        
                        // 更新data属性
                        currentEditRow.setAttribute('data-name', name);
                        currentEditRow.setAttribute('data-email', email);
                        currentEditRow.setAttribute('data-phone', countryCode);
                        currentEditRow.setAttribute('data-phone-number', phone);
                        currentEditRow.setAttribute('data-rebate', rebate);
                    }
                }
                
                alert('业务员更新成功！');
            } else {
                // 添加模式
                console.log('添加业务员:', {
                    name: name,
                    email: email,
                    phone: countryCode + phone,
                    rebate: rebate
                });
                
                alert('业务员添加成功！');
            }
            
            // 关闭弹窗并重置表单
            if (addResellerModal) {
                addResellerModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            this.reset();
            isEditMode = false;
            currentEditRow = null;
            if (resellerModalTitle) resellerModalTitle.textContent = 'Add a Reseller';
            if (submitResellerBtn) submitResellerBtn.textContent = 'Add Reseller';
        });
    }
    
    // 关闭弹窗时重置为添加模式
    if (closeAddResellerModalBtn) {
        closeAddResellerModalBtn.addEventListener('click', function() {
            if (addResellerModal) {
                addResellerModal.classList.remove('active');
                document.body.style.overflow = '';
                if (addResellerForm) {
                    addResellerForm.reset();
                }
                isEditMode = false;
                currentEditRow = null;
                if (resellerModalTitle) resellerModalTitle.textContent = 'Add a reseller';
                if (submitResellerBtn) submitResellerBtn.textContent = 'Add Reseller';
            }
        });
    }
    
    // 点击遮罩层关闭时也重置
    if (addResellerModal) {
        addResellerModal.addEventListener('click', function(e) {
            if (e.target === addResellerModal) {
                addResellerModal.classList.remove('active');
                document.body.style.overflow = '';
                if (addResellerForm) {
                    addResellerForm.reset();
                }
                isEditMode = false;
                currentEditRow = null;
                if (resellerModalTitle) resellerModalTitle.textContent = 'Add a reseller';
                if (submitResellerBtn) submitResellerBtn.textContent = 'Add Reseller';
            }
        });
    }
    
    // 操作搜索
    const actionSearchInput = document.querySelector('.action-search-input');
    if (actionSearchInput) {
        actionSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            console.log('搜索:', searchTerm);
        });
    }
    
    // 模态弹窗 - More details 和 Delete
    const detailsModal = document.getElementById('detailsModal');
    const closeModalBtn = document.getElementById('closeModal');
    
    // 使用事件委托处理菜单项点击
    document.body.addEventListener('click', function(e) {
        const menuItem = e.target.closest('.action-menu-item');
        
        if (menuItem) {
            e.preventDefault();
            e.stopPropagation();
            
            const menuText = menuItem.textContent.trim();
            const dropdown = menuItem.closest('.action-dropdown');
            
            // 关闭操作下拉菜单
            if (dropdown) {
                dropdown.classList.remove('active');
            }
            
            // 处理不同的菜单项
            if (menuText === 'Delete') {
                // 确认删除
                if (confirm('确定要删除这个业务员吗？')) {
                    const row = menuItem.closest('tr');
                    if (row) {
                        row.remove();
                        console.log('业务员已删除');
                    }
                }
            } else if (menuText === 'More details') {
                // 打开详情弹窗
                if (detailsModal) {
                    detailsModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
            // Edit按钮的处理在上面单独处理
        }
    });
    
    // 关闭模态弹窗
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            if (detailsModal) {
                detailsModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // 点击遮罩层关闭弹窗
    if (detailsModal) {
        detailsModal.addEventListener('click', function(e) {
            if (e.target === detailsModal) {
                detailsModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (detailsModal && detailsModal.classList.contains('active')) {
                detailsModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            if (addResellerModal && addResellerModal.classList.contains('active')) {
                addResellerModal.classList.remove('active');
                document.body.style.overflow = '';
                if (addResellerForm) {
                    addResellerForm.reset();
                }
                if (resellerModalTitle) {
                    resellerModalTitle.textContent = 'Add a Reseller';
                }
                if (submitResellerBtn) {
                    submitResellerBtn.textContent = 'Add Reseller';
                }
            }
        }
    });
    
    // 复制功能
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy') || this.previousElementSibling.value;
            
            // 复制到剪贴板
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // 显示复制成功提示
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 2000);
                });
            } else {
                // 降级方案
                const textarea = document.createElement('textarea');
                textarea.value = textToCopy;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                const originalHTML = this.innerHTML;
                this.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            }
        });
    });
    
    // 下载按钮
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            console.log('下载QR码');
            alert('下载QR码功能');
        });
    }
    
    console.log('所有事件监听器已设置完成');
});
