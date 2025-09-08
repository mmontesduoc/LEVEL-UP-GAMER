// JavaScript simplificado para el formulario de registro
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del formulario
    const form = document.getElementById('registerForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const birthDate = document.getElementById('birthDate');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const showPasswordsCheckbox = document.getElementById('showPasswords');
    const acceptTerms = document.getElementById('acceptTerms');
    const submitButton = form.querySelector('.btn-register');

    // Variable para controlar el descuento DUOC
    let hasDuocDiscount = false;

    // Función para mostrar/ocultar contraseñas
    showPasswordsCheckbox.addEventListener('change', function() {
        const type = this.checked ? 'text' : 'password';
        password.type = type;
        confirmPassword.type = type;
    });

    // Función para calcular edad
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    // Función para validar todo el formulario (solo al enviar)
    function validateForm() {
        // Limpiar mensajes anteriores
        clearMessages();

        let isValid = true;
        let errors = [];

        // Validar nombre
        if (firstName.value.trim().length < 2) {
            errors.push("El nombre debe tener al menos 2 caracteres");
            isValid = false;
        }

        // Validar apellido
        if (lastName.value.trim().length < 2) {
            errors.push("El apellido debe tener al menos 2 caracteres");
            isValid = false;
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            errors.push("El formato del email no es válido");
            isValid = false;
        } else {
            // Verificar descuento DUOC
            if (email.value.toLowerCase().includes('@duoc.cl')) {
                hasDuocDiscount = true;
                showMessage("¡Descuento DUOC del 20% aplicado! 🎉", "success");
            }
        }

        // Validar teléfono
        if (phone.value.trim().length < 8) {
            errors.push("El teléfono debe tener al menos 8 dígitos");
            isValid = false;
        }

        // Validar edad (mayor de 18)
        if (!birthDate.value) {
            errors.push("La fecha de nacimiento es requerida");
            isValid = false;
        } else {
            const age = calculateAge(birthDate.value);
            if (age < 18) {
                errors.push(`Debes ser mayor de 18 años. Tu edad actual: ${age} años`);
                isValid = false;
            }
        }

        // Validar contraseña
        if (password.value.length < 8) {
            errors.push("La contraseña debe tener al menos 8 caracteres");
            isValid = false;
        }

        // Validar confirmación de contraseña
        if (password.value !== confirmPassword.value) {
            errors.push("Las contraseñas no coinciden");
            isValid = false;
        }

        // Validar términos y condiciones
        if (!acceptTerms.checked) {
            errors.push("Debes aceptar los términos y condiciones");
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
        
        form.insertAdjacentHTML('beforebegin', errorHTML);
        
        // Scroll al mensaje de error
        document.querySelector('.alert-danger').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    // Función para mostrar mensaje de éxito
    function showMessage(message, type = "info") {
        const alertClass = type === "success" ? "alert-success" : "alert-info";
        const messageHTML = `
            <div class="alert ${alertClass}" role="alert">
                ${message}
            </div>
        `;
        
        form.insertAdjacentHTML('beforebegin', messageHTML);
    }

    // Función para limpiar mensajes
    function clearMessages() {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => alert.remove());
    }

    // Función para recopilar datos del formulario
    function collectFormData() {
        const age = calculateAge(birthDate.value);
        
        return {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim().toLowerCase(),
            phone: phone.value.trim(),
            birthDate: birthDate.value,
            age: age,
            hasDuocDiscount: hasDuocDiscount,
            discountPercentage: hasDuocDiscount ? 20 : 0,
            acceptNewsletter: document.getElementById('acceptNewsletter').checked,
            registrationDate: new Date().toISOString()
        };
    }

    // Función para simular envío al servidor
    function simulateServerRequest(userData) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Datos enviados al servidor:', userData);
                resolve({
                    success: true,
                    message: 'Usuario registrado exitosamente'
                });
            }, 2000);
        });
    }

    // Función para mostrar estado de carga
    function showLoadingState() {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        submitButton.textContent = 'REGISTRANDO...';
    }

    // Función para ocultar estado de carga
    function hideLoadingState() {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        submitButton.textContent = 'CREAR CUENTA';
    }

    // Función para mostrar mensaje final de éxito
    function showSuccessMessage(userData) {
        clearMessages();
        
        const successHTML = `
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">¡Registro exitoso! 🎉</h4>
                <p><strong>Bienvenido/a ${userData.firstName} ${userData.lastName}!</strong></p>
                <p>Tu cuenta ha sido creada exitosamente.</p>
                ${userData.hasDuocDiscount ? 
                    '<p class="mb-0"><strong>🎓 ¡Felicidades! Tienes un descuento permanente del 20% por ser estudiante de DUOC UC.</strong></p>' : 
                    ''
                }
                <hr>
                <p class="mb-0">En breve serás redirigido al inicio de sesión...</p>
            </div>
        `;
        
        form.insertAdjacentHTML('beforebegin', successHTML);
        form.style.display = 'none';
        
        // Scroll al mensaje
        document.querySelector('.alert-success').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Redirigir después de 3 segundos
        setTimeout(() => {
            window.location.href = '../layouts/inicio-sesion.html';
        }, 3000);
    }

    // Manejador del evento submit
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validar formulario
        if (!validateForm()) {
            return;
        }

        try {
            showLoadingState();
            
            const userData = collectFormData();
            const response = await simulateServerRequest(userData);
            
            if (response.success) {
                showSuccessMessage(userData);
            }
            
        } catch (error) {
            console.error('Error en el registro:', error);
            clearMessages();
            showMessage('Hubo un error al procesar el registro. Por favor, intenta nuevamente.', 'danger');
        } finally {
            hideLoadingState();
        }
    });

    // Establecer fecha máxima (hace 18 años)
    function setMaxDate() {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const maxDate = eighteenYearsAgo.toISOString().split('T')[0];
        birthDate.setAttribute('max', maxDate);
    }

    // Inicialización
    setMaxDate();
    console.log('Sistema de registro inicializado correctamente');
});