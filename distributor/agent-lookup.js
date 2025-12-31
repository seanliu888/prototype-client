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
            // 隐藏生成的密码显示
            if (generatedPasswordDisplay) {
                generatedPasswordDisplay.style.display = 'none';
            }
            if (resellerPasswordInput) {
                resellerPasswordInput.type = 'password';
            }
            if (resellerModalTitle) {
                resellerModalTitle.textContent = 'Add a sales agent';
            }
            if (submitResellerBtn) {
                submitResellerBtn.textContent = 'Add Sales Agent';
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
    const resellerPasswordInput = document.getElementById('resellerPassword');
    const generatePasswordBtn = document.getElementById('generatePasswordBtn');
    const generatedPasswordDisplay = document.getElementById('generatedPasswordDisplay');
    const generatedPasswordText = document.getElementById('generatedPasswordText');
    const copyPasswordBtn = document.getElementById('copyPasswordBtn');
    let isEditMode = false;
    let currentEditRow = null;
    
    // 生成随机密码函数
    function generateRandomPassword(length = 12) {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*';
        const allChars = uppercase + lowercase + numbers + symbols;
        
        let password = '';
        // 确保至少包含一个大写字母、小写字母、数字和符号
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += symbols[Math.floor(Math.random() * symbols.length)];
        
        // 填充剩余长度
        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        // 打乱字符顺序
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }
    
    // 生成密码按钮点击事件
    if (generatePasswordBtn && resellerPasswordInput) {
        generatePasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const generatedPassword = generateRandomPassword(12);
            resellerPasswordInput.value = generatedPassword;
            resellerPasswordInput.type = 'text'; // 临时显示密码
            
            // 显示生成的密码
            if (generatedPasswordText) {
                generatedPasswordText.textContent = generatedPassword;
            }
            if (generatedPasswordDisplay) {
                generatedPasswordDisplay.style.display = 'block';
            }
            
            // 3秒后隐藏密码
            setTimeout(() => {
                if (resellerPasswordInput) {
                    resellerPasswordInput.type = 'password';
                }
            }, 3000);
        });
    }
    
    // 复制密码按钮点击事件
    if (copyPasswordBtn && generatedPasswordText) {
        copyPasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const password = generatedPasswordText.textContent;
            if (password) {
                navigator.clipboard.writeText(password).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 3L5 11M5 3L13 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('复制失败:', err);
                    alert('复制失败，请手动复制');
                });
            }
        });
    }
    
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
            // 编辑模式下清空密码字段
            if (resellerPasswordInput) {
                resellerPasswordInput.value = '';
                resellerPasswordInput.type = 'password';
            }
            // 隐藏生成的密码显示
            if (generatedPasswordDisplay) {
                generatedPasswordDisplay.style.display = 'none';
            }
            
            // 切换到编辑模式
            isEditMode = true;
            currentEditRow = row;
            if (resellerModalTitle) resellerModalTitle.textContent = 'Edit Sales Agent';
            if (submitResellerBtn) submitResellerBtn.textContent = 'Update Sales Agent';
            
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
            let password = resellerPasswordInput ? resellerPasswordInput.value : '';
            
            // 如果密码为空，自动生成
            if (!password || password.trim() === '') {
                password = generateRandomPassword(12);
                // 显示生成的密码
                if (generatedPasswordText) {
                    generatedPasswordText.textContent = password;
                }
                if (generatedPasswordDisplay) {
                    generatedPasswordDisplay.style.display = 'block';
                }
            }
            
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
                    rebate: rebate,
                    password: password ? '***' : '未设置'
                });
                
                // 如果自动生成了密码，显示给用户
                if (generatedPasswordDisplay && generatedPasswordDisplay.style.display !== 'none') {
                    alert('业务员添加成功！\n\n初始密码: ' + password + '\n\n请保存此密码，系统不会再次显示。');
                } else {
                    alert('业务员添加成功！');
                }
            }
            
            // 关闭弹窗并重置表单
            if (addResellerModal) {
                addResellerModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            this.reset();
            // 隐藏生成的密码显示
            if (generatedPasswordDisplay) {
                generatedPasswordDisplay.style.display = 'none';
            }
            if (resellerPasswordInput) {
                resellerPasswordInput.type = 'password';
            }
            isEditMode = false;
            currentEditRow = null;
            if (resellerModalTitle) resellerModalTitle.textContent = 'Add a Sales Agent';
            if (submitResellerBtn) submitResellerBtn.textContent = 'Add Sales Agent';
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
                // 隐藏生成的密码显示
                if (generatedPasswordDisplay) {
                    generatedPasswordDisplay.style.display = 'none';
                }
                if (resellerPasswordInput) {
                    resellerPasswordInput.type = 'password';
                }
                isEditMode = false;
                currentEditRow = null;
                if (resellerModalTitle) resellerModalTitle.textContent = 'Add a sales agent';
                if (submitResellerBtn) submitResellerBtn.textContent = 'Add Sales Agent';
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
                // 隐藏生成的密码显示
                if (generatedPasswordDisplay) {
                    generatedPasswordDisplay.style.display = 'none';
                }
                if (resellerPasswordInput) {
                    resellerPasswordInput.type = 'password';
                }
                isEditMode = false;
                currentEditRow = null;
                if (resellerModalTitle) resellerModalTitle.textContent = 'Add a sales agent';
                if (submitResellerBtn) submitResellerBtn.textContent = 'Add Sales Agent';
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
                const row = menuItem.closest('tr');
                if (row && detailsModal) {
                    // 获取业务员信息并更新弹窗内容
                    const name = row.getAttribute('data-name') || row.cells[1].textContent;
                    const email = row.getAttribute('data-email') || row.cells[2].textContent;
                    const countryCode = row.getAttribute('data-phone') || '';
                    const phoneNumber = row.getAttribute('data-phone-number') || '';
                    const phone = phoneNumber ? (countryCode + ' ' + phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')) : row.cells[3].textContent;
                    const rebate = row.getAttribute('data-rebate') || row.cells[4].textContent.replace('%', '');
                    
                    // 更新弹窗中的信息
                    const infoItems = detailsModal.querySelectorAll('.info-item');
                    if (infoItems.length >= 6) {
                        if (infoItems[1]) infoItems[1].querySelector('.info-value').textContent = name;
                        if (infoItems[2]) infoItems[2].querySelector('.info-value').textContent = email;
                        if (infoItems[3]) infoItems[3].querySelector('.info-value').textContent = phone;
                        if (infoItems[4]) infoItems[4].querySelector('.info-value').textContent = rebate + '%';
                    }
                    
                    // 存储当前业务员行，用于重置密码
                    detailsModal.setAttribute('data-current-row', row.rowIndex);
                    
                    // 重置密码表单状态
                    const resetPasswordForm = document.getElementById('resetPasswordForm');
                    if (resetPasswordForm) {
                        resetPasswordForm.style.display = 'none';
                    }
                    const resetPasswordInput = document.getElementById('resetPasswordInput');
                    if (resetPasswordInput) {
                        resetPasswordInput.value = '';
                        resetPasswordInput.type = 'password';
                    }
                    const resetGeneratedPasswordDisplay = document.getElementById('resetGeneratedPasswordDisplay');
                    if (resetGeneratedPasswordDisplay) {
                        resetGeneratedPasswordDisplay.style.display = 'none';
                    }
                    
                    detailsModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            }
            // Edit按钮的处理在上面单独处理
        }
    });
    
    // 重置密码显示的函数
    function resetPasswordDisplay() {
        const resetPasswordForm = document.getElementById('resetPasswordForm');
        const resetPasswordInput = document.getElementById('resetPasswordInput');
        const resetGeneratedPasswordDisplay = document.getElementById('resetGeneratedPasswordDisplay');
        
        // 隐藏重置密码表单
        if (resetPasswordForm) {
            resetPasswordForm.style.display = 'none';
        }
        
        // 清空输入
        if (resetPasswordInput) {
            resetPasswordInput.value = '';
            resetPasswordInput.type = 'password';
        }
        if (resetGeneratedPasswordDisplay) {
            resetGeneratedPasswordDisplay.style.display = 'none';
        }
    }
    
    // 关闭模态弹窗
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            if (detailsModal) {
                resetPasswordDisplay();
                detailsModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // 点击遮罩层关闭弹窗
    if (detailsModal) {
        detailsModal.addEventListener('click', function(e) {
            if (e.target === detailsModal) {
                resetPasswordDisplay();
                detailsModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (detailsModal && detailsModal.classList.contains('active')) {
                resetPasswordDisplay();
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
                    resellerModalTitle.textContent = 'Add a Sales Agent';
                }
                if (submitResellerBtn) {
                    submitResellerBtn.textContent = 'Add Sales Agent';
                }
            }
        }
    });
    
    // 重置密码功能
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const resetPasswordInput = document.getElementById('resetPasswordInput');
    const generateResetPasswordBtn = document.getElementById('generateResetPasswordBtn');
    const resetGeneratedPasswordDisplay = document.getElementById('resetGeneratedPasswordDisplay');
    const resetGeneratedPasswordText = document.getElementById('resetGeneratedPasswordText');
    const copyResetPasswordBtn = document.getElementById('copyResetPasswordBtn');
    const confirmResetPasswordBtn = document.getElementById('confirmResetPasswordBtn');
    const cancelResetPasswordBtn = document.getElementById('cancelResetPasswordBtn');
    const currentPasswordDisplay = document.getElementById('currentPasswordDisplay');
    
    // 显示/隐藏重置密码表单
    if (resetPasswordBtn && resetPasswordForm) {
        resetPasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 切换表单显示
            if (resetPasswordForm.style.display === 'none') {
                resetPasswordForm.style.display = 'block';
                if (resetPasswordInput) {
                    resetPasswordInput.value = '';
                    resetPasswordInput.type = 'password';
                }
                if (resetGeneratedPasswordDisplay) {
                    resetGeneratedPasswordDisplay.style.display = 'none';
                }
            } else {
                resetPasswordForm.style.display = 'none';
            }
        });
    }
    
    // 生成重置密码
    if (generateResetPasswordBtn && resetPasswordInput) {
        generateResetPasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const generatedPassword = generateRandomPassword(12);
            resetPasswordInput.value = generatedPassword;
            resetPasswordInput.type = 'text'; // 临时显示密码
            
            // 显示生成的密码
            if (resetGeneratedPasswordText) {
                resetGeneratedPasswordText.textContent = generatedPassword;
            }
            if (resetGeneratedPasswordDisplay) {
                resetGeneratedPasswordDisplay.style.display = 'block';
            }
            
            // 3秒后隐藏密码
            setTimeout(() => {
                if (resetPasswordInput) {
                    resetPasswordInput.type = 'password';
                }
            }, 3000);
        });
    }
    
    // 复制重置密码
    if (copyResetPasswordBtn && resetGeneratedPasswordText) {
        copyResetPasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const password = resetGeneratedPasswordText.textContent;
            if (password) {
                navigator.clipboard.writeText(password).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 3L5 11M5 3L13 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('复制失败:', err);
                    alert('复制失败，请手动复制');
                });
            }
        });
    }
    
    // 确认重置密码
    if (confirmResetPasswordBtn && resetPasswordInput) {
        confirmResetPasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            let newPassword = resetPasswordInput.value.trim();
            
            // 如果密码为空，自动生成
            if (!newPassword || newPassword === '') {
                newPassword = generateRandomPassword(12);
                // 显示生成的密码
                if (resetGeneratedPasswordText) {
                    resetGeneratedPasswordText.textContent = newPassword;
                }
                if (resetGeneratedPasswordDisplay) {
                    resetGeneratedPasswordDisplay.style.display = 'block';
                }
            }
            
            // 获取业务员名称
            const resellerName = detailsModal ? (detailsModal.querySelectorAll('.info-item')[1]?.querySelector('.info-value')?.textContent || 'Unknown') : 'Unknown';
            
            // 更新密码显示
            if (currentPasswordDisplay) {
                currentPasswordDisplay.textContent = '••••••••';
                currentPasswordDisplay.style.color = '#999';
            }
            
            // 隐藏表单
            if (resetPasswordForm) {
                resetPasswordForm.style.display = 'none';
            }
            
            // 显示成功提示
            if (resetGeneratedPasswordDisplay && resetGeneratedPasswordDisplay.style.display !== 'none') {
                alert('密码重置成功！\n\n业务员: ' + resellerName + '\n新密码: ' + newPassword + '\n\n请保存此密码，系统不会再次显示。');
            } else {
                alert('密码重置成功！\n\n业务员: ' + resellerName);
            }
            
            // 清空表单
            if (resetPasswordInput) {
                resetPasswordInput.value = '';
                resetPasswordInput.type = 'password';
            }
            if (resetGeneratedPasswordDisplay) {
                resetGeneratedPasswordDisplay.style.display = 'none';
            }
            
            console.log('密码已重置:', {
                reseller: resellerName,
                newPassword: newPassword ? '***' : '未设置'
            });
        });
    }
    
    // 取消重置密码
    if (cancelResetPasswordBtn && resetPasswordForm) {
        cancelResetPasswordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 隐藏表单
            resetPasswordForm.style.display = 'none';
            
            // 清空输入
            if (resetPasswordInput) {
                resetPasswordInput.value = '';
                resetPasswordInput.type = 'password';
            }
            if (resetGeneratedPasswordDisplay) {
                resetGeneratedPasswordDisplay.style.display = 'none';
            }
        });
    }
    
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
