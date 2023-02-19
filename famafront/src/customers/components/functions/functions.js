import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const URL_BASE_API = "https://localhost:7240/api/";

export function showAlert(message, icon, title, foco = "") {
  onFocus(foco);
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: title,
    text: message,
    icon: icon,
    confirmButtonText: "Ok",
  });
}

function onFocus(foco) {
  if (foco !== "") {
    document.getElementById("foco").focus();
  }
}
