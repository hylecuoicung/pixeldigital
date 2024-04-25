document.addEventListener('DOMContentLoaded', function() {
	let winnerAnnounced = false;  // Biến để kiểm tra liệu người thắng cuộc đã được công bố hay chưa
	let horses = [
		{name:"Sếp", image: "thuy.png"},
		{name:"Thợ Đụng", image: "huy.png"},
		{name:"Nhật Tài", image: "tai.png"},
		{name:"Cô Giáo Nga", image: "nga.png"},
		{name:"Thị Hợp", image: "hop.png"},
		{name:"Con Buôn", image: "duy anh.png"},
		{name:"2 con Báo", image: "dog.png"},
	]

	function startRace() {
		const raceTrack = document.getElementById('raceTrack');
		raceTrack.innerHTML = '';
		const raceTrackWidth = raceTrack.clientWidth - 100;

		horses.forEach((horse, index) => {
			const horseImg = document.createElement('img');
			horseImg.src = `images/${horse.image}`;
			horseImg.className = 'horse';
			horseImg.style.top = `${index * 100}px`;
			raceTrack.appendChild(horseImg);

			setTimeout(() => {
				moveHorse(horseImg, horse.name, raceTrackWidth);
			}, 100 + index * 100);
		});
		winnerAnnounced = false;
	}


	function moveHorse(horseImg, name, finishLine) {
		let position = 0;
		const interval = setInterval(() => {
			position += Math.random() * 30;
			horseImg.style.transform = `translateX(${position}px)`;
			if (position >= finishLine) {
				clearInterval(interval);
				if (!winnerAnnounced) {
					announceWinner(name, horseImg.src);
					winnerAnnounced = true;
				}
			}
		}, 100);
	}

	function announceWinner(name, src) {
		const winnerModal = document.getElementById('winnerModal');
		const winnerImage = document.getElementById('winnerImage');
		const winnerName = document.getElementById('winnerName');
		const restartButton = document.getElementById('restartRace');

		winnerImage.src = src;
		winnerName.textContent = `Ngựa chiến thắng: ${name}`;
		winnerModal.style.display = 'block';
		restartButton.style.display = 'inline-block';
	}
	window.startRace = startRace; // Make startRace globally available

    document.getElementById('restartRace').addEventListener('click', function() {
        document.getElementById('winnerModal').style.display = 'none';
        startRace(); // Restart the race
    });
});