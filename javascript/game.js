$(document).ready(function() {

// character attributes

var game = {

	clickEnemy: 0,
	clickChar: 0,
	chosenEnemy: "",
	chosenChar: "",
	charHealth: "",
	enemyHealth: "",
	charAttack: "",
	enemyAttack: "",
	enemyCount: 3,

	characters: [{
        name: "Obi-Wan Kenobi",
        attack: 10,
        counterattack: 20,
        health: 120,
        image: "<img src='week-4-game/images/Obi-wan kehobi.png'>"
    },

    {
        name: "Luke Skywalker",
        attack: 8,
        counterattack: 7,
        health: 100,
        image: "<img src='week-4-game/images/Luke skywalker.png'>"
    },

    {
        name: "Darth Sidious",
        attack: 12,
        counterattack: 25,
        health: 150,
        image: "<img src='week-4-game/images/Darth sidious.png'>"
    },

    {
        name: "Dart Maul",
        attack: 8,
        counterattack: 15,
        health: 180,
        image: "<img src='week-4-game/images/Darth Maul.png'>"
    }],

    // Character buttons
    charList: function() {   
    	for (var i = 0; i < game.characters.length; i++) {

        var c = $('<button>');
        c.addClass("selChar " + game.characters[i].name);
        c.attr('data-name', game.characters[i].name);
        c.attr('data-health', game.characters[i].health);
       	c.attr('data-attack', game.characters[i].attack);
       	c.attr('data-counterattack', game.characters[i].counterattack);
        c.attr('data-index', i);
        c.html(game.characters[i].image);
        c.append("<p id='charTitle'>" + game.characters[i].name + "</p>" + " " + "<h4 id='charHealth'>" + game.characters[i].health + "</h4>");

        $('#buttonNewGame').hide();
        $("#selCharpre").append(c);
    }
}    

};
	// Function to display buttons
    game.charList();

    //Character function
    $(".selChar").on("click", function(){
    	if (game.clickChar <=0) {
				$(this).siblings().removeClass("selChar").addClass("Enemies").attr('id', 'combatant');
				$('.selChar').appendTo('#selChar');
				$('.Enemies').appendTo("#Enemies");
				game.chosenChar = $(this).data("name");
				$(this).attr('id', "chosenChar");
				game.charHealth = $(this).data("health");
				game.charAttack = $(this).data("attack");
				game.clickChar ++;

			}
	});	
    //Enemy function
    $('#Enemies').on('click', 'button', function() {
    		if (game.clickEnemy <= 0 || game.enemyHealth <= 0) {
    			$(this).removeClass("Enemies").addClass("Defender");
				$('.Defender').appendTo('#Defender');
				$(this).attr('id', "chosenEnemy");
				game.chosenEnemy = $(this).data("name");
				game.enemyHealth = $(this).data("health");
				game.enemyAttack = $(this).data("counterattack");
				game.clickEnemy	 ++;
			} else {
				$('#results').html("You've already chosen " + game.chosenEnemy);
			}
	});

	//Attack function
    $('#buttonAttack').on('click', function() {	
	
		if (game.charHealth && game.enemyHealth >= 0) {
			game.enemyHealth -= game.charAttack;			
			game.charHealth -= game.enemyAttack;
			console.log(game.enemyHealth);
			console.log(game.charHealth);
			$('#chosenChar h4 ').text(game.charHealth);
			$('#chosenEnemy h4 ').text(game.enemyHealth);
			$('#results').html("You attacked " + game.chosenEnemy + " for " + game.charAttack + " points! ");
			$('#results').append( game.chosenEnemy + " counter attacked you for " + game.enemyAttack + " points");
			game.charAttack += 8;
		} else if (game.enemyCount == 0) {
			$('#results').html("You defeated all the Enemies. You Win!! ");
			game.clickChar = 0;
			$('#buttonNewGame').show();
		} else if (game.charHealth >= 1) {
			$('#results').html("You defeated " + game.chosenEnemy);
			game.enemyCount --;
			$('#Defender').empty();
		} else {
			$('#results').html("You were defeated by " + game.chosenEnemy + ". Game Over!");
			game.clickChar = 0;
			$('#buttonNewGame').show();
		}
	});

	//New function
	$('#buttonNewGame').on('click', function() {
		$('#results').empty();
		$('#Defender').empty();
		$('#Enemies').empty();
		$('#selChar').empty();
		$('#selCharpre').empty();
		game.charList();

	});	
});