// JavaScript simplificado para página de inicio de sesión
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const showPasswordCheckbox = document.getElementById('showPassword');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const loginForm = document.getElementById('loginForm');
    const submitButton = loginForm.querySelector('.btn-login');
    
    // Función para mostrar/ocultar contraseña
    if (showPasswordCheckbox && passwordInput) {
        showPasswordCheckbox.addEventListener('change', function() {
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    }
    
    // Función para validar todo el formulario (solo al enviar)
    function validateForm() {
        clearMessages();
        
        let isValid = true;
        let errors = [];
        
        // Validar email
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            errors.push('El correo electrónico es obligatorio');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            errors.push('Por favor ingrese un correo electrónico válido');
            isValid = false;
        }
        
        // Validar contraseña
        const password = passwordInput.value.trim();
        
        if (password === '') {
            errors.push('La contraseña es obligatoria');
            isValid = false;
        } else if (password.length < 6) {
            errors.push('La contraseña debe tener al menos 6 caracteres');
            isValid = false;
        }
        
        // Mostrar errores si los hay
        if (!isValid) {
            showErrors(errors);
        }
        
        return isValid;
    }
    
    // Función para mostrar errores
    function showErrors(errors) {
        const errorHTML = `
            <div class="alert alert-danger" role="alert">
                <h5>Por favor corrige los siguientes errores:</h5>
                <ul class="mb-0">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        
        loginForm.insertAdjacentHTML('beforebegin', errorHTML);
        
        // Scroll al mensaje de error
        document.querySelector('.alert-danger').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    // Función para mostrar mensaje
    function showMessage(message, type = "info") {
        const alertClass = `alert-${type}`;
        const messageHTML = `
            <div class="alert ${alertClass}" role="alert">
                ${message}
            </div>
        `;
        
        loginForm.insertAdjacentHTML('beforebegin', messageHTML);
    }
    
    // Función para limpiar mensajes
    function clearMessages() {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => alert.remove());
    }
    
    // Función para simular login
    function simulateLogin(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simular validación de credenciales
                if (email === 'admin@levelup.com' && password === '123456') {
                    resolve({
                        success: true,
                        message: 'Inicio de sesión exitoso',
                        user: { email: email, name: 'Admin' }
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Credenciales incorrectas. Email o contraseña inválidos.'
                    });
                }
            }, 1500);
        });
    }
    
    // Función para mostrar estado de carga
    function showLoadingState() {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.textContent = 'INICIANDO SESIÓN...';
    }
    
    // Función para ocultar estado de carga
    function hideLoadingState() {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = 'INICIAR SESIÓN';
    }
    
    // Función para mostrar éxito de login
    function showSuccessLogin(userData) {
        clearMessages();
        
        const successHTML = `
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">¡Bienvenido! 🎮</h4>
                <p><strong>Inicio de sesión exitoso</strong></p>
                <p>Serás redirigido al panel principal...</p>
            </div>
        `;
        
        loginForm.insertAdjacentHTML('beforebegin', successHTML);
        loginForm.style.display = 'none';
        
        // Scroll al mensaje
        document.querySelector('.alert-success').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Redirigir después de 2 segundos
        setTimeout(() => {
            window.location.href = '../layouts/menu-principal.html';
        }, 2000);
    }
    
    // Manejador del evento submit
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (!validateForm()) {
                return;
            }
            
            try {
                showLoadingState();
                
                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();
                
                const response = await simulateLogin(email, password);
                
                if (response.success) {
                    showSuccessLogin(response.user);
                }
                
            } catch (error) {
                clearMessages();
                showMessage(error.message, 'danger');
                console.error('Error en el login:', error);
            } finally {
                hideLoadingState();
            }
        });
    }
    
    console.log('Sistema de login inicializado correctamente');
    console.log('Elementos encontrados:', {
        showPasswordCheckbox: !!showPasswordCheckbox,
        passwordInput: !!passwordInput,
        emailInput: !!emailInput,
        loginForm: !!loginForm
    });
});