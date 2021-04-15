import $ from "jquery";
import "./style.scss";

$("#main").html("Here we go!");

let count = 0;

setInterval(() => {
	count += 1;
	$("#main").text(`You've been on this page for ${count} seconds.`);
}, 1000);
