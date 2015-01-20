$(function() {
	$("#designer").sortable({
		revert: true,
		placeholder: "placeholder"
	}).droppable({
		drop: function(event, ui) {
			addItem(ui.draggable);
		}
	});

	$(".widgets").draggable({
		connectToSortable: "#designer",
		helper: "clone",
		addClasses: false,
		revert: "invalid"
	});

	$("div").disableSelection();

	initEvents();
});

var current;

function initEvents() {
	$("#prop_label").keyup(function(event) {
		if (current) {
			current.find(".nv-item-label").text($(this).val());
		}
	});
};

$(document).on("selectItem", function(event, item) {
	$("#prop_label").val(item.find(".nv-item-label").text());
	$("#prop_model_field").val(item.attr("prop_model_field"));
	$("#prop_group").val(item.attr("prop_group"));
});

function addItem(item) {
	if (item.data("initialized")) {
		return;
	}

	item.data("initialized", true);
	item.click(function() {
		$("#designer .widgets").removeClass("widgets-selected");
		current = $(this);
		current.addClass("widgets-selected");
		$(document).trigger("selectItem", [current]);
	});
};