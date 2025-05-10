
document.addEventListener('DOMContentLoaded', function() {
    
    const playButton = document.getElementById('playButton');
    const surpriseButton = document.getElementById('surpriseButton');
    const audioPlayer = document.getElementById('audioPlayer');
    const surpriseModal = document.getElementById('surpriseModal');
    const closeModal = document.querySelector('.close-modal');
    
    let isPlaying = false;
    
    function togglePlay() {
        if (isPlaying) {
            audioPlayer.pause();
            playButton.textContent = 'Reproducir';
        } else {
            audioPlayer.play()
                .then(() => {
                    
                    playButton.textContent = 'Pausar';
                })
                .catch(error => {
                   
                    console.error('Error al reproducir el audio:', error);
                    alert('No se pudo reproducir la canción. Por favor, inténtalo de nuevo.');
                });
        }
        isPlaying = !isPlaying;
    }
    

    playButton.addEventListener('click', togglePlay);
   
    function showSurprise() {
    
        surpriseModal.style.display = 'block';
        
        // Crear más corazones voladores en el fondo
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'float surprise-heart';
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.left = Math.random() * 90 + '%';
            heart.style.top = Math.random() * 80 + '%';
            heart.style.animationDelay = Math.random() * 5 + 's';
            document.body.appendChild(heart);
            
            // Eliminar el corazón después de 10 segundos
            setTimeout(() => {
                heart.remove();
            }, 10000);
        }
        
        // Iniciar la reproducción de música si no está sonando
        if (!isPlaying) {
            audioPlayer.play()
                .then(() => {
                    playButton.textContent = 'Pausar';
                    isPlaying = true;
                })
                .catch(err => {
                    console.error('No se pudo reproducir automáticamente:', err);
                });
        }
    }
    
    // Cerrar el modal cuando se hace clic en la X
    closeModal.addEventListener('click', function() {
        surpriseModal.style.display = 'none';
    });
    
    // Cerrar el modal cuando se hace clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === surpriseModal) {
            surpriseModal.style.display = 'none';
        }
    });
    
    // Evento de tecla Escape para cerrar el modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && surpriseModal.style.display === 'block') {
            surpriseModal.style.display = 'none';
        }
    });
    
    // Añadir evento al botón sorpresa
    surpriseButton.addEventListener('click', showSurprise);
    
    // Actualizar texto del botón cuando termina la canción
    audioPlayer.addEventListener('ended', function() {
        playButton.textContent = 'Reproducir';
        isPlaying = false;
    });
});