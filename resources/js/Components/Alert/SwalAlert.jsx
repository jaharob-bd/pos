import Swal from 'sweetalert2';

const SwalAlert = (icon, title = null) => {
    Swal.fire({
        text: title,
        icon: icon,
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
};

export default SwalAlert;