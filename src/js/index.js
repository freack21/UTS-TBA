const namaInput = document.getElementById("namaInput");
const nimInput = document.getElementById("nimInput");
const submitBtn = document.getElementById("submitBtn");
const clearBtn = document.getElementById("clearBtn");
const scannerInput = document.getElementById("scannerInput");
const namaOutput = document.getElementById("namaOutput");
const nimOutput = document.getElementById("nimOutput");
const statusFieldScan = document.getElementById("statusFieldScan");
const statusScan = document.getElementById("statusScan");
const statusFieldNama = document.getElementById("statusFieldNama");
const statusNama = document.getElementById("statusNama");
const statusFieldNim = document.getElementById("statusFieldNim");
const statusNim = document.getElementById("statusNim");

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const chars = [
    " ",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
const allChars = [...numbers, ...chars];
const defaultSleep = 250;
let isProcessing = false;

nimInput.oninput = () => {
    // const value = nimInput.value;
    // if (!numbers.includes(value[value.length - 1])) {
    //     nimInput.value = value.substr(0, value.length - 1);
    // }
    statusFieldNama.style.display = "none";
    statusFieldNim.style.display = "none";
};

submitBtn.onclick = async () => await scan();
clearBtn.onclick = () => {
    if (isProcessing) return;
    statusFieldNama.style.display = "none";
    statusFieldNim.style.display = "none";
    statusFieldScan.style.display = "none";
    nimInput.value =
        namaInput.value =
        namaOutput.value =
        nimOutput.value =
        scannerInput.value =
            "";
};
nimInput.onkeyup = namaInput.onkeyup = async (e) => {
    if (e.keyCode == 13) {
        await scan();
    }
};

namaInput.onchange = () => {
    statusFieldNama.style.display = "none";
    statusFieldNim.style.display = "none";
};

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function scan() {
    isProcessing = true;
    const valueNama = namaInput.value;
    const valueNim = nimInput.value;
    statusFieldNama.style.display = "none";
    statusFieldNim.style.display = "none";

    if (valueNama) {
        namaOutput.value = "";
        statusFieldScan.style.display = "block";
        for (let i = 0; i < valueNama.length; i++) {
            for (let j = 0; j < chars.length; j++) {
                scannerInput.value = chars[j];
                if (chars[j] == valueNama[i]) {
                    statusScan.classList.add("confirm");
                    statusScan.classList.remove("unconfirm");
                    statusScan.innerText = "Diterima!";
                    await sleep(defaultSleep * 5);
                    namaOutput.value += chars[j];
                    break;
                } else {
                    statusScan.classList.add("unconfirm");
                    statusScan.classList.remove("confirm");
                    statusScan.innerText = "Tidak diterima!";
                }
                await sleep(defaultSleep);
                statusScan.style.display = "none";
                scannerInput.value = "";
                await sleep(defaultSleep);
                statusScan.style.display = "inline";
            }
        }
        await sleep(defaultSleep * 10);
        statusFieldScan.style.display = "none";
        scannerInput.value = "";

        statusFieldNama.style.display = "block";
        if (namaInput.value == namaOutput.value) {
            statusNama.classList.add("confirm");
            statusNama.classList.remove("unconfirm");
            statusNama.innerText = " Nama dikenali!!";
        } else {
            statusNama.classList.add("unconfirm");
            statusNama.classList.remove("confirm");
            statusNama.innerText = " Nama tidak dikenali!!";
        }
    }

    if (valueNim) {
        nimOutput.value = "";
        statusFieldScan.style.display = "block";
        for (let i = 0; i < valueNim.length; i++) {
            for (let j = 0; j < numbers.length; j++) {
                scannerInput.value = numbers[j];
                if (numbers[j] == valueNim[i]) {
                    statusScan.classList.add("confirm");
                    statusScan.classList.remove("unconfirm");
                    statusScan.innerText = "Diterima!";
                    await sleep(defaultSleep * 5);
                    nimOutput.value += numbers[j];
                    break;
                } else {
                    statusScan.classList.add("unconfirm");
                    statusScan.classList.remove("confirm");
                    statusScan.innerText = "Tidak diterima!";
                }
                await sleep(defaultSleep);
                statusScan.style.display = "none";
                scannerInput.value = "";
                await sleep(defaultSleep);
                statusScan.style.display = "inline";
            }
        }
        await sleep(defaultSleep * 10);
        statusFieldScan.style.display = "none";
        scannerInput.value = "";

        statusFieldNim.style.display = "block";
        if (nimInput.value == nimOutput.value) {
            statusNim.classList.add("confirm");
            statusNim.classList.remove("unconfirm");
            statusNim.innerText = " NIM dikenali!!";
        } else {
            statusNim.classList.add("unconfirm");
            statusNim.classList.remove("confirm");
            statusNim.innerText = " NIM tidak dikenali!!";
        }
    }

    isProcessing = false;
}
