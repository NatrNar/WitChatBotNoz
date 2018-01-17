const Wit = require('node-wit').Wit;
const Config = require('./config');
const getWit = () => {
    return new Wit({accessToken: Config.WIT_TOKEN});
};
const client = getWit();


function Answer(msg) {
    let hi = 0, bye = 0, sym = 0, help = 0, thnx = 0, situ = 0;
    msg = JSON.parse(JSON.stringify(msg));
    msg = msg.entities;
    let res = '';

    let hi_array = ['Heyy', 'Hello', 'Hi', 'Hey', 'Hola', 'nice to meet you', 'welcome', 'I am happy to meet you'];
    let bye_array = ['GoodBye', 'byee', 'bye', 'see ya', 'see you soon', 'I am glad to know you ', 'see you again'];
    let sit_array = ['Oh Thanks Im fine ', 'I am Great', 'Super', 'I am Fine ', 'Great!!!', 'Cool !', 'Well', 'so nice'];
    let thx_array = ['Thanx', 'Thank you very much', 'wow thanks', 'Thanks', 'you welcome', 'You Make me Happy'];
    let help_array = ['Yes', 'Sure', 'Yeah , Sure I will help you', 'Why not ?', 'Yes,I am here for helping', 'Sure,Im here for Serving', 'What do you feel ? ', 'Tell me What are your potential_Symptoms ?'];
    let links_array = ['https://www.everlywell.come/products/food-sensitiviy/', 'https://www.everlywell.come/products/testosterone-test/'];
    let advise_array = ['I advise you to try this ', 'Try this please', 'That would help you', 'Maybe you need this ', 'You have to try this', "That's what you need", 'Here it is'];
    let food_array = ['fatigue', 'feeling tired', 'muscle pain', 'lack of concentration', 'dry skin', 'itchy skin', 'other skin issues', 'headaches', 'migraines', 'bloating', 'abdominal pain', 'food intolerance', 'changes in bowel habits'];
    let testo_array = ['fatigue', 'feeling tired', 'increase body fat', 'decrease muscle mass', 'depression', 'low sex drive', 'mental fatigue', 'lace of concentration'];
    let understnd_array=["Oh I don't understand what you said , please say that in a better way",'What !!','What you said ??','Say it again please','Do you speak sibisain ?'];

    if (!Object.keys(msg).length)
       return  understnd_array[(Math.floor(Math.random() * understnd_array.length))];
    else {


        //console.log(msg);
        var sym_array = [];
        if (msg.hey && msg.hey[0].confidence > 0.7) hi++;
        if (msg.byee && msg.byee[0].confidence > 0.7) bye++;
        if (msg.thanx && msg.thanx[0].confidence > 0.7) thnx++;
        if (msg.wit_situation && msg.wit_situation[0].confidence > 0.7) situ++;
        if (msg.asking_help && msg.asking_help[0].confidence > 0.7) help++;
        if (msg.potential_Symptoms && msg.potential_Symptoms[0].confidence > 0.7) {
            sym++;

            for (let i = 0; i < msg.potential_Symptoms.length; i++)
                if (msg.potential_Symptoms[i].confidence > 0.7)
                    sym_array.push(msg.potential_Symptoms[i].value.toLowerCase());
        }

    }

    if (hi > 0) {
        let randomNumber = Math.floor(Math.random() * hi_array.length);
        res += hi_array[randomNumber] + '\n';
    }
    if (situ > 0) {
        let randomNumber = Math.floor(Math.random() * sit_array.length);
        res += (sit_array[randomNumber]) + '\n';
    }
    if (thnx > 0) {
        let randomNumber = Math.floor(Math.random() * thx_array.length);
        res += (thx_array[randomNumber]) + '\n';
    }
    if (help > 0) {
        let randomNumber = Math.floor(Math.random() * help_array.length);
        res += (help_array[randomNumber]) + '\n';
    }
    if (sym > 0) {
        let randomNumber = Math.floor(Math.random() * advise_array.length);
        res += (advise_array[randomNumber]) + '\n';
        let l1 = search(sym_array, food_array);
        let l2 = search(sym_array, testo_array);


        if (l1 > l2)
            res += (links_array[0]) + '\n';
        else if (l1 < l2)
            res += (links_array[1]) + '\n';
        else {
            res += (links_array[0]) + '\n';
            res += ("Or This") + '\n';
            res += (links_array[1]) + '\n';
        }


    }

    if (bye > 0) {
        let randomNumber = Math.floor(Math.random() * bye_array.length);
        res += (bye_array[randomNumber]) + '\n';
    }


    return res;
    //console.log(hi, bye, thnx, situ, help, sym);


}

function search(arr1, arr2) {
    let res = 0;
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {

            if (arr1[i] == arr2[j])
                res++;
        }
    }

    return res;
}

module.exports = {
    client: client,
    Answer: Answer
};