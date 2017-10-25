import _ from 'lodash';
import { action, computed, observable } from 'mobx';
import Event from './event'
import shuffle from 'shuffle-array'

class Store {
	@observable events = [];
	@observable loaded = false;

	constructor() {
	  this._initialEventPopulate();
	  this._fbEventPopulate();
	}

	@action _initialEventPopulate() {
		this.addEvent("LAN Party", "Local Gamers", new Date(2017, 10, 1, 13), "Southbank", `Nothing but LAN Party for the whole weekend! Bring your PC, hunker down with your friends, and have fun! 
		Featuring:
		- The final of BCSTournament
		- Stands from vendors and gaming studios
		- Epic food trucks
		- Lucky draw for gaming gear
		
		Don't forget to sign up, we have limited space in the building!`,"admin", "gaming computers lan party food truck");
		this.addEvent("Knitting Tutorials 101", "Knitting Community", new Date(2017, 10, 1, 13), "Southbank", "Learn to knit with instagram extraordinaire, Me!","knit", "knitting tutorial beginners");
		this.addEvent("Cars and Coffee", "RealGarage", new Date(2017, 11, 9, 7), "Toowong", "No frills, just Cars and Coffee on a Sunday morning", "cars", "cars meetup coffee sunday");
		this.addEvent("Book Fair 2018", "Library", new Date(), "CBD", "Biggest book fair in Brisbane is coming!", "book", "book fair discount literature books");
		this.addEvent("Pick-up basketball", "Ryan", new Date(2017, 9, 30), "Toowong Basketball Court", "Looking for pickup games this weekend. Come! open to all players!", "Ryan", "basketball pickup sport weekend");
	}

	@action addEvent(name, hostName, dateTime, location, description, created_by, tags) {
		const event = new Event(name, hostName, dateTime, location, description, created_by, tags);
		this.events.push(event);
		return event;
	}

	@computed get listLength() {
		return this.events.length;
	}

	@computed get openEvents() {
		return this.events.filter(event => event.created_by);
	}

	@observable createdEvents(user) {
		return this.events.filter(event => event.created_by == user.id);
	}

	@observable unseenEvents(user) {
		return shuffle(this.events.filter(event =>
			!user.eventsSeen.includes(event.key) &&
			event.created_by != user.id &&
			event.tags.some(r=> user.tagSet.has(r))));
	}

	@observable interestedEvents(user) {
		return _.sortBy(this.events.filter(event =>
			user.eventsInterested.includes(event.key)), 'dateTime');
	}

	@computed get allTags () {
		aTags = new Set();
		this.events.filter(event => event.tags.filter(tag => aTags.add(tag)));
		return [...aTags];

	}

	@action _fbEventPopulate() {
		this.addEvent(`Original Brisbane Oktoberfest`,`Original Brisbane Oktoberfest`,`2017-10-27T16:00:00+1000`,`Brisbane German Club`,`We are holding the Original Brisbane Oktoberfest!

Friday October 27th from 6pm - Midnight.
Saturday October 28th, 12pm - Midnight.
Sunday October 29th, 11am - 5pm.

Fully imported German Beers on Tap.
Over Seventy German Beers in the Bottle.
Pretzels, Sausages, Snitzels and our Famous Pork Knuckle.
Entertainment all night with Andrew and Guest Entertainers......

Social Members $5 entry.
Non-Members $10 entry.

Please note, we are not taking bookings for this event.`,`Original Brisbane Oktoberfest`,`Original Brisbane Oktoberfest`);
this.addEvent(`Brisbane Toy and Hobby Fair`,`Brisbane Toy and Hobby Fair`,`2017-11-05T09:00:00+1000`,`Brisbane Table Tennis`,`Without a doubt the best selection of Toys and collectables available at any fair i attend in Australia. I am overwhelmed by the sheer amount of quality new and vintage toys, and the warm demeanor of the sellers everytime i travel to Brisbane for this fair. If you have never been than book a plan, cancel a wedding or just do what you have to do to get to this awesome event.`,`Brisbane Toy and Hobby Fair`,`Brisbane Toy and Hobby Fair`);
this.addEvent(`Carl & Eric's Mobile Disco - Brisbane`,`Carl & Eric's Mobile Disco - Brisbane`,`2017-10-28T13:00:00+1000`,`Mt Coot-tha Botancial Gardens`,`Taking place at the scenic and iconic Coo-tha Botanical Gardens located 7 kilometers from the Brisbane CBD in Toowong, Queensland, Australia, at the foot of Brisbane's tallest mountain, Mount Coottha. Tickets on sale now!

CARL COX & ERIC POWELL ANNOUNCE 2017 ‘MOBILE DISCO’ FEATURING INCOGNITO!!
Featuring: Incognito (Live) (with 12 piece band)
Behind the Hits: Nights Over Egypt, Always There, Don’t You Worry Bout a Thing + more..

After the success of taking ‘Mobile Disco’ in 2016 to Adelaide for the first time and into the city of Melbourne, Carl & Eric are excited to announce that for 2017 ‘Mobile Disco’ will now visit Mt Coo-tha Botanical Gardens, Brisbane, QLD and heading back to the Peninsula for a ‘Mobile Disco’ on ‘The Lawn’ at Mornington Racecourse, Mornington, Vic.
 
Headlining these amazing events is one of the world’s biggest, most loved and respected DJs: Carl Cox.  Joined by his esteemed partner in crime Eric Powell, the dynamic duo’s ‘Mobile Disco’ will be entertaining the crowds for most of the day & will see the boys digging deep in their record crates to spin: old and new disco, jazz-funk, soul and classic house tunes.  Fresh from the success of PURE in Ibiza the lads are ready to get ‘funky.’
 
Joining Carl and Eric for an incredible LIVE performance will be the Acid Jazz legends ‘Incognito.’ The Award Winning Brit Funk group will be performing some of their best loved classics including: Don't You Worry Bout a Thing, Nights over Egypt, Always There, Parisienne Girl & more.
 
‘MOBILE DISCO’ DATES:
Saturday 28th October – Botanic Gardens Mount Coot-tha, Brisbane  
Tickets: http://bit.ly/2uYhNyb (On sale Friday 4th August)
 
Sunday 29th October – ‘The Lawn’ Mornington Racecourse, Mornington
Tickets: http://bit.ly/2hm4CTc (On sale Friday 4th August)
 
Saturday 4th November – ‘Return to Rio’ - Del Rio, Riverside Resort, Wisemans Ferry, NSW
SOLD OUT (Sold out in 10 days)
 
Sunday 5th November – S.C. Pannell Wines, 60 Olivers Rd, McLaren Vale, Adelaide
SOLD OUT (Sold out in 48 hours)
 
Incognito Videos:
https://www.youtube.com/watch?v=Ex92TZRuSAA - Live at Baloise 2013
https://www.youtube.com/watch?v=avC07hISWVw - Live at Singapore Jazz Festival 2014
https://www.youtube.com/watch?v=CHorhdoxGO4 - Live in London (Always There) 2015
https://www.youtube.com/watch?v=6AF0zVDKTYA - Live at Java Jazz with Chaka Khan 2015`,`Carl & Eric's Mobile Disco - Brisbane`,`Carl & Eric's Mobile Disco - Brisbane`);
this.addEvent(`Autofest - Oktoberfest Brisbane 2017`,`Autofest - Oktoberfest Brisbane 2017`,`2017-10-15T11:00:00+1000`,`Oktoberfest Brisbane`,`Autofest 2017
Sunday 15th October
11am - 4pm 

Autofest this year takes place on Sunday 15th October, showcasing vintage, classic or late model German motor cars, bikes or trucks. Come along and check out some of these stunning vehicles and have a chat with fellow car aficionados at this exclusive event and behold the superior world of German automotive engineering, innovation and luxury.`,`Autofest - Oktoberfest Brisbane 2017`,`Autofest - Oktoberfest Brisbane 2017`);
this.addEvent(`Oktoberfest Brisbane 2017 - Second Weekend (13-15 Okt)`,`Oktoberfest Brisbane 2017 - Second Weekend (13-15 Okt)`,`2017-10-13T16:00:00+1000`,`Oktoberfest Brisbane`,`Oktoberfest Brisbane is proudly Australia’s largest German Festival and one of Brisbane’s major events! Join us over the weekends of 6-8 & 13-15 of Oktober, as we celebrate all things German.

Bring your family and friends to the Brisbane Showgrounds over our SECOND WEEKEND (13-15 Oktober) and experience the atmosphere and spectacle that is Oktoberfest Brisbane. See the Brisbane Showgrounds transformed into a mini Bavaria, showcasing some of Germany’s finest. Indulge from the vast selection of food including some of the classics, Bratwurst, Pork Knuckle, Schnitzel or Cakes, not to forget the specially-brewed German beers. It makes for a truly delectable cultural experience!

Entertain your senses with yodeller Heidi, Alpenrosen Dance Group and our very own Bavarian Oompah band, but don’t forget to get front row seats to our coveted competitions, Beardmeister (Friday) and Bavarian Strongmen (Saturday).

Every day is different, every day is exciting! Embrace your inner German, don your Dirndl and Lederhosen, 2017 promises to be incredible, as Oktoberfest Brisbane celebrates its 10th festival!

When?
● Friday, Oktober 13th
● Saturday, Oktober 14th
● Sunday, Oktober 15th

Where?
Brisbane Showgrounds, entry via Gregory Tce, Bowen Hills.

Tickets?
Get your tickets now at https://oktoberfestbrisbane.com.au/tickets/general-admission/ 

Find all the info and more at www.oktoberfestbrisbane.com.au`,`Oktoberfest Brisbane 2017 - Second Weekend (13-15 Okt)`,`Oktoberfest Brisbane 2017 - Second Weekend (13-15 Okt)`);
this.addEvent(`Cars & Coffee Sundays Brisbane`,`Cars & Coffee Sundays Brisbane`,`2017-10-22T07:30:00+1000`,`SSCC Automotive`,`A casual event that encourages exotic/classic car and motorsport enthusiasts to meet over coffee and snacks while appreciating the cars of fellow enthusiasts. We suggest arriving early to get a premium parking spot. SSCC Automotive in Brisbane have kindly open their doors to us to host  our 2nd event this time in Brisbane. 


This event is also Proudly supported by Zarraffas Coffee, McLaren Gold Coast, Aston Martin Qld, Rolls-Royce Motor Cars Qld, M1 Tyres & Service, Carbuzzzn & SSCC Automotive.`,`Cars & Coffee Sundays Brisbane`,`Cars & Coffee Sundays Brisbane`);
this.addEvent(`Brisbane BlaBla Language Exchange #3`,`Brisbane BlaBla Language Exchange #3`,`2017-10-26T19:00:00+1000`,`Down Under Bar & Grill`,`Please, like our Facebook page to follow our events and keep yourself stay in tuned with our possible changes: https://www.facebook.com/Brisbane-BlaBla-Language-Exchange-1754205044841931

How does our event work?
It's so simple. At the entrance, you can ask our team members to guide you to your group. 
We have different language groups, for example, you can also learn the local language or improve your skills in Japanese, French, English, Korean, Spanish, German, Russian, etc… (Please check our Facebook page). 
Even though you are coming to speak Chinese, you are welcome to practice other languages as well, our team members would like to guide you to whichever group you want to. 

We have various topics on a paper which will be put on the table, you can choose whatever topic to talk about, to share with group members, as well as games of question- answer. Feel free to talk about what you prefer to, but suggest don't bring political stuff in since we are an international event, we respect differences among our event members, we hope to build up an international event community that embrace the value of friendship. 

Quite easy huh? 
Join us, making friends and Improving Your language skills.`,`Brisbane BlaBla Language Exchange #3`,`Brisbane BlaBla Language Exchange #3`);
this.addEvent(`Brisbane's Biggest Clothing Garage Sale`,`Brisbane's Biggest Clothing Garage Sale`,`2017-10-08T10:00:00+1000`,`Bizzell's Garage`,`Brisbane's Biggest Garage Sale is back at again! 
With a live DJ, a crapload of clothes and our best lineup of sellers yet, this will be an event you don't want to miss.

When: Sunday the 29th of October from 10 am - 3 pm. 

Where: Bizzell's Garage (93 Latrobe Terrace, Paddington).

• THIS IS AN ALL AGES / FREE EVENT •

BRIC-A-BRAC, RECORDS, CDS, DVDS, LEATHER ITEMS, OLD SCHOOL DENIM, SNEAKERS, BOOKS, ACCESSORIES, PLANTS (SUCCULENTS), JEWELRY, SWIMWEAR, LINGERIE ...

AND

Vintage and Preloved goods for the Young and Old from brands like:
Ralph Lauren (Polo Sport, Polo Jeans, Polo Denim etc.), Nike, Tommy Hilfiger, Nautica, Adidas, Stone Island, The North Face, Champion, Lacoste, Butter Goods, CP Company, Helley Hansen, Carhartt, Patagonia, Levis, Obey, Puma, New Balance, FUBU, Kappa, Burberry, Christian Dior, Stussy, Supreme, Reebok, Paul & Shark, FILA, Asics, Converse, Vans, Calvin Klein, Wrangler, Hugo Boss, Guess, Gant, GAP, Timberland, Fred Perry, Saucony, Everlast, Slazenger, Tommy Bahama and plenty more.

PRICES WILL VARY DEPENDING ON INDIVIDUAL BUSINESSES AND OR SELLERS. Items will range anywhere between $5 - $100+ depending on the Brand, Quality, Condition, and Rarity of the garments.

NO FAKE, REWORKED OR COUNTERFEIT GARMENTS ON PREMISES.

30+ Unique Vintage and Pre Loved Goods Sellers! 

SELLERS :
• Lil J's Vintage Accoutre


Haven't been to one of our G Sales? Check out some of our videos to get a feel for the day - https://www.facebook.com/pg/LilJsVintage/videos/?ref=page_internal 

~ NO SMOKING OR ALCOHOL CONSUMPTION ON PREMISES ~ 

Are you interested in becoming a regular seller or just getting rid of bulk clothes? Email Jacqueline Cowan at liljsvintage@gmail.com, we don't discriminate against any kind of garments, we appreciate a solid wardrobe spring clean and we also love supporting entrepreneurs with their small businesses and dreams. 

Feel free to email any questions or queries & make sure you come and say G'Day X

*Toilets and parking directly across the road @ Woolworths!*`,`Brisbane's Biggest Clothing Garage Sale`,`Brisbane's Biggest Clothing Garage Sale`);
this.addEvent(`JFF Brisbane`,`JFF Brisbane`,`2017-10-25T19:00:00+1000`,`Event Cinemas Myer Centre`,`We’re excited to bring Brisbane the best Japanese cinema of 2017. This year’s program shares a spectrum of emotions and human experiences, and boldly delves into new territory for Japanese cinema. Sensitive portrayals of modern families and stories of diversity, acceptance, and resilience sit alongside old favourites of action, mystery, and comedy.

For anime-lovers, ANCIEN AND THE MAGIC TABLET is an adventure through fantasy and reality, while IN THIS CORNER OF THE WORLD offers a moving story for mature anime fans. Gripping crime and mystery highlights include BIRDS WITHOUT NAMES, RAGE, MEMOIRS OF A MURDERER and GUKOROKU: TRACES OF SIN.

TORI GIRL and HAMON: YAKUZA BOOGIE will have comedy fans in stitches with quirky tales of misfortune and serendipity, while RE-LIFE and TEIICHI -BATTLE OF SUPREME HIGH- will take you back to the drama of high school. 

The true stories in KISEKI: SOBITO OF THAT DAY and SATOSHI -A MOVE FOR TOMORROW- share the remarkable experiences of Japanese young adults challenging their destinies.
For fans of sophisticated drama and complex relationships, RADIANCE, OVER THE FENCE and A DOUBLE LIFE and share poetic portrayals of human fragility. 

With fresh views modern families, HER LOVE BOILS BATHWATER and CLOSE-KNIT celebrate the bittersweet texture of life and the value of belonging.

In a beautifully presented period drama, FLOWER AND SWORD offers insights to traditional Japanese values and aesthetic culture, while MUMON: THE LAND OF STEALTH shares action-packed ninja and samurai adventure.

TICKETS
Tickets can be bought online or at the partnering cinema venue's box office. Booking fees apply to online purchases.

Adult - $18.50 (Early bird - $16.50)
Concession - $15.50 (Early bird - $14.50)
*5-Film Pass - $75
*10+ Group Booking - $13.50 per ticket (for one film only)
Japan Foundation Members - $13

*Must be purchased via the box office in a single transaction. Excludes opening, closing, and special guest screenings.
5-Film Passes can be used for one or multiple films.

FULL PROGRAM & SCHEDULE 
Available online via http://japanesefilmfestival.net/

ABOUT 
The JFF is presented by The Japan Foundation Sydney and tours major cities and regional centres across Australia. JFF Australia is part of JFF Asia-Pacific Platform initiated by The Japan Foundation Asia Center based in Tokyo.`,`JFF Brisbane`,`JFF Brisbane`);
this.addEvent(`Brisbane - Electric Gardens`,`Brisbane - Electric Gardens`,`2018-01-25T17:00:00+1000`,`Brisbane Showgrounds`,`1st Release SOLD OUT!!
2nd Release SOLD OUT!!
Limited 3rd Release now on sale through Oztix >>
http://bit.ly/EG2018Bris

Electric Gardens returns to Brisbane in 2018 – after our incredible debut in 2016, we thought we would bring our weapon of choice back to Brisbane. That’s right, FATBOY SLIM – one of the most influential artists in the dance music world – will officially headline Electric Gardens Brisbane on January 25, 2018.

Joining Fatboy Slim will be North London sensations GORGON CITY, playing one of their infamous underground DJ sets, with the cherry on the cake by way of US house hero MK.

FATYBOY SLIM
After christening the inaugural Electric Gardens back in 2016 with a truly unforgettable performance, FATBOY SLIM is pulling on his signature Hawaiian shirt once again to be the life and soul of Electric Gardens! If you missed him in 2016, make sure you do not miss him this time around. And if you caught him in 2016, then you know you are in for a treat!

GORGON CITY
GORGON CITY’s polished, powerful and party-minded sound – a mix of heavy hip-swinging rhythms meets butt-shaking bass – gets people making shapes all over the world, and we can’t wait to have the North London pair on our EG stage. They have helped shape the trajectory of deep house with their thoughtful, yet infectious productions.

MK (MARC KINCHEN)
Also joining us at EG 2018 is the man behind some of the biggest tracks of early house, and still one of the most in-demand DJs on the global circuit, revered producer, remixer and DJ – MK.

Limited First Release tickets now on sale through Oztix!`,`Brisbane - Electric Gardens`,`Brisbane - Electric Gardens`);
this.addEvent(`Brisbane Kite Festival`,`Brisbane Kite Festival`,`2017-10-22T10:00:00+1000`,`Brisbane Kite Festival`,`Free fun family event at 1182 Wynnum Rd Cannon Hill`,`Brisbane Kite Festival`,`Brisbane Kite Festival`);
this.addEvent(`Brisbane Good Food and Wine Show`,`Brisbane Good Food and Wine Show`,`2017-10-27T09:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`Yay, we're bringing the Vinomofo Adventure Park to the Brisbane Good Food & Wine Show on 27-29 October. We've got FREE WINE ICE-CREAM, complimentary tastings, a virtual reality experience, plus an adult-friendly swing for all of your Instagram photo opps... 😜

Did we mention free ice-cream? Don't miss out!`,`Brisbane Good Food and Wine Show`,`Brisbane Good Food and Wine Show`);
this.addEvent(`Pennywise | Brisbane`,`Pennywise | Brisbane`,`2017-10-28T19:00:00+1000`,`Eatons Hill Hotel`,`Australia! We'll see you in the pit for the 'Full Circle' Twentieth Anniversary Tour with The Bronx 27 October - 03 November. Get tickets at DestroyAllLines.com`,`Pennywise | Brisbane`,`Pennywise | Brisbane`);
this.addEvent(`Brisbane Fiesta Latina 2017`,`Brisbane Fiesta Latina 2017`,`2017-11-04T11:00:00+1000`,`Roma Street Parkland`,`Only 13 days to go!!!  Brisbane Fiesta Latina is a free community festival with the theme ‘Dia de los Muertos- Day of the Dead’- a significant day in many Latin American culture calendars.

With this festival, we hope to share and celebrate Latin American culture unique, the beliefs and aspirations of its people and the joy that we want to share with everyone through our food, music, dancing, arts, & crafts and friendship. Latin America is a continent of great diversity with 22 countries contributing to its uniqueness- all of the participants at the festival are talented local artists and artisans.

We have a full program including traditional dancing groups, arts and crafts and with live music, there is plenty of opportunity to get into the groove on the dance floor. So, get your dancing shoes ready and join us to celebrate the best of Latin American culture right here in Brisbane! 

Hasta Pronto Brisbane!

You can join our team at :
https://www.lacaqld.org.au/brisbane-fiesta-latina-busca-voluntariados/`,`Brisbane Fiesta Latina 2017`,`Brisbane Fiesta Latina 2017`);
this.addEvent(`Brisbane Encore Shows`,`Brisbane Encore Shows`,`2017-10-20T19:00:00+1000`,`The Paddo`,`EXTRA SHOW ADDED! Back by popular demand. Troy Kinne is doing three more Encore performances of his sell out live show. 
Fri Oct 20 (sold out), Sat Oct 21 (sold out) and Sun Oct 22`,`Brisbane Encore Shows`,`Brisbane Encore Shows`);
this.addEvent(`Brisbane HER Spring Party`,`Brisbane HER Spring Party`,`2017-11-10T19:00:00+1000`,`Venue EI8HT`,`HER - The App for LGBTQ+ women and queer people is an online app with over 2.2million users live in over 55 countries, HER is the biggest queer app for LGBTQ+ people worldwide helping people in our community to connect.  

Our SPRING Party will be hosted by Ei8ht which gives us a much larger space to create the best spring party Brisbane has seen. The party will kick off at 7pm with an acoustic performer followed by an awesome DJ line up to get you all on the dance floor.  

Our first Winter party sold out, so don't leave it to the last minute & possibly miss out!

Early Bird $10 (limited)
Standard $15
Door $20 (if available)

Coming on your own or new to Brisbane or the community? There will be a pre-meet arranged from 5-7pm at The Empire Hotel where you can meet some of our HER team and other party goers before the official event starts. You will walk up as a group so don’t even give coming on your own a second thought.

This is a queer women’s event however we are inclusive of the entire LGBTQ+ community and allies so please feel free to bring your gay/straight, male/female friends and family to join in on the fun. HER is a safe space for our community.

Currently not on HER? Download the app here: https://bnc.lt/e89j/o1QScjUnZC

See who's going from the HER app: https://weareher.com/shared-event/17260

Get Social with HER @hersocialapp

Any questions? Contact the HER Brisbane City Lead: Kerrie - kerrie@weareher.com

** This is an 18+ event & valid ID is required for scanning on entry ***  A photographer will be present so by purchasing a ticket you consent`,`Brisbane HER Spring Party`,`Brisbane HER Spring Party`);
this.addEvent(`QC Brisbane Meet & Cruise`,`QC Brisbane Meet & Cruise`,`2017-10-28T18:00:00+1000`,`Harry's Diner`,`QC Brisbane Meet & Cruise

Harry's Diner at Winsor, let us host a Meet here, so come enjoy a feed at the old school style diner, admire the variety of nice cars, catch up with friends and chat to like minded motoring enthusiasts.

This event is completely free and welcomes all forms of cars including Muscle, Classic, Hot Rod, Aussie, American, JDM, Euro, 4WD’s & Bikes.

For club rego cars that require a travel concession to this event please use this number: TC 177-01-2017

QLD CRUISING EXCLUSIVE MEET:

Harry's Diner at 6pm-8pm
Homezone Windsor,14/104 Newmarket Rd,Windsor QLD 4030
Please note if Harry's carpark is full there is ample parking opposite or next door.

CRUISE:

Leave for our destination at 8pm.
Cruise location will be revealed on the night at Harry's Diner, written on the Qld Cruising board, Located in front of Harry's Diner shop. Please read carefully as cruise details will not be posted on here. 

**CONDITION OF ATTENDANCE**

No burnouts on arrival, at the event, on the cruise or on departure.
Reframe from excessive revving.
No bad language.
Use the bins provided for all rubbish.
Respect fellow enthusiasts as well as the public.
Antisocial behaviour will not be tolerated.

CCTV is installed so any unlawful behaviour will be reported to the local police.

QLD CRUISING stickers will be available to be purchased at the event.

Support where you can to help ensure this event continues. Invite your friends and family, also share the event to help get this out. Hope to see you there.`,`QC Brisbane Meet & Cruise`,`QC Brisbane Meet & Cruise`);
this.addEvent(`Brisbane - The Gut Movie Premiere`,`Brisbane - The Gut Movie Premiere`,`2017-11-14T19:00:00+1000`,`Event Cinemas Myer Centre`,`The premiere of the long awaited and stunning documentary investigating the human microbiome.

In The Gut Movie, we follow the journey of journalist & researcher Kale Brock as, in the quest to discover whether the 'optimal microbiome' does indeed exist, he travels from Australia to Namibia to live with The San, an ancient hunter-gatherer people living traditionally from the land. During the excursion Brock monitors his own microbiome and how it changes in conjunction with the new surroundings, and takes microbiome samples of The San to gauge the significant differences in microbiota present across cultures.

With expert commentary by leading gastroenterologist Professor Thomas Borody, molecular geneticist Dr Margie Smith, immunology researcher and expert Professor Mimi Tang and naturopath and chiropractor Dr Damian Kristof, The Gut Movie provides an insightful yet entertaining look at the explosive research of the gut & its impact on human health. 

Each event will be followed by a Q&A with the director (Kale Brock). 

"The future of medicine may lie somewhere completely unexpected, somewhere only few have dared to look so far, somewhere so farfetched and bizarre that only now in the modern world are we beginning to investigate it... poop. Yes, in our poop."

Kale Brock

Director, Producer & Presenter

The Gut Movie`,`Brisbane - The Gut Movie Premiere`,`Brisbane - The Gut Movie Premiere`);
this.addEvent(`Brisbane - 7th Iranian Film Festival Australia (IFFA 2017)`,`Brisbane - 7th Iranian Film Festival Australia (IFFA 2017)`,`2017-11-02T19:00:00+1000`,`New Farm Cinemas`,`We are delighted to annoucne that the 7th Iranian Film Festival is coming back to six capital cities around Australia with the best selection of contemporary Iranain cinema. 

*Mark your calendars: 
Brisbane, 2-5 NOV 2017 @ New Farm Cinemas

More details and the full program will be announced soon. Stay Tuned! 

Check the Website: www.iffa.net.au

** If you are interested to become one of our festival partners at IFFA 2017 please email us at info@iffa.net.au`,`Brisbane - 7th Iranian Film Festival Australia (IFFA 2017)`,`Brisbane - 7th Iranian Film Festival Australia (IFFA 2017)`);
this.addEvent(`Brisbane Water Oyster Festival 2017`,`Brisbane Water Oyster Festival 2017`,`2017-11-12T09:30:00+1100`,`Ettalong Diggers`,`The Brisbane Water Oyster Festival was established in 2000 by the Peninsula Chamber of Commerce to showcase the beautiful waterways of the Woy Woy Peninsula and our largest primary industry, the oyster farming industry.

The annual Oyster Festival is on the second Sunday of November each year at Ettalong Beach right on the recently upgraded beach and waterfront. It is a superb day out for the whole family and lovers of fine food and wine.

The day includes fine wine from our neighbours in the Hunter Valley and food from around the world. With over 40 art and craft stall as well as exhibition stands.

The day commences with a full program of live, on stage entertainment.

'How Many Oysters Can You Eat in 30 Seconds' sponsored by Radio 2GO /SeaFM & Helloworld Woy Woy and Gosford, with oysters donated by Whitten’s Organic Oysters — is the highlight of the day with many competing for the famous trophy and prize.`,`Brisbane Water Oyster Festival 2017`,`Brisbane Water Oyster Festival 2017`);
this.addEvent(`Brisbane: Beach Clean up: Sea Shepherd Marine Debris Campaign`,`Brisbane: Beach Clean up: Sea Shepherd Marine Debris Campaign`,`2017-11-11T09:00:00+1000`,`Kangaroo Point- Meet at Kangaroo Point  Cliffs Park`,`Its estimated that we are all responsible for roughly 130 kilos of plastic wastage annually. What better way to counter that than help protect our beaches and marine-life from further damage by joining us at a beach clean and removing debris before it has a chance to reach the oceans.

This is your chance to make a difference! 

Our clean-ups are family friendly – everyone is welcome!
We will meet at Kangaroo Point Cliffs park, just look out for our gazebo!`,`Brisbane: Beach Clean up: Sea Shepherd Marine Debris Campaign`,`Brisbane: Beach Clean up: Sea Shepherd Marine Debris Campaign`);
this.addEvent(`Brisbane Vegan Markets 1st Birthday !`,`Brisbane Vegan Markets 1st Birthday !`,`2017-11-12T09:00:00+1000`,`Brisbane Vegan Markets`,`Can you believe we have hit 1 year already !
Come down for more of the same awesome food,drink,merch,jewelry and make up stalls and then some ! 
Our lucky winner of the $250 prize pack will be announced just before the event, keep tagging your photos #brisbaneveganmarkets`,`Brisbane Vegan Markets 1st Birthday !`,`Brisbane Vegan Markets 1st Birthday !`);
this.addEvent(`Alice Cooper in Brisbane`,`Alice Cooper in Brisbane`,`2017-10-25T19:00:00+1000`,`Brisbane Entertainment Centre`,`Get tickets for Alice Cooper concert in Brisbane, 25 Oct 2017 on ConcertWith.Me - http://cwm.io/868749

All tickets on Concertwith.Me covered by our guarantee.

You will receive a 100% refund for your tickets if:

- Your order was accepted but not delivered by the seller.
- Your order was accepted but not delivered in time for the event.
- Your event is cancelled and is not rescheduled.
- Your tickets were not valid for entry.
- You can purchase your tickets with peace of mind knowing we have you covered.`,`Alice Cooper in Brisbane`,`Alice Cooper in Brisbane`);
this.addEvent(`Brisbane SS17 Finders Keepers Market`,`Brisbane SS17 Finders Keepers Market`,`2017-11-10T17:00:00+1000`,`Brisbane Showgrounds`,`Visit our website for more information: 
bit.ly/finders-keepers-brisbane-ss17

The Finders Keepers Brisbane Spring Summer 2017 Market
Friday 10th November 5pm - 10pm
Saturday 11th November 9am - 4pm
Sunday 12th November 9am - 4pm

Where?
The Marquee
Brisbane Showgrounds
600 Gregory Terrace
Bowen Hills QLD 4006

How Much?
Entry is $2, and children under 12 are FREE!

What are the Finders Keepers markets? 
In 2017 we will focus on hosting one blockbuster event in Brisbane. We’re focusing on growing the number of stallholders we can accept into Brisbane, adding a bar, as well as adding an extra day of trade. 

To read about it, as well as our new operating hours head to our blog - bit.ly/FK-2017

Stay tuned for further Brisbane updates closer to the event time.

ATM:
There are ATM's available at the markets, however these are known to attract long queues at every event. Many stalls now accept debit / credit cards, but we strongly suggest you bring cash with you to avoid any disappointment.

ART AND DESIGN STALLS:
bit.ly/ss17-bris-designers

FOOD TRUCKS AND STALLS:
Check back soon!

MUSIC LINE-UP:
Check back soon!

Applications for our Brisbane Spring Summer 2017 market now closed!  Stay tuned for an announcement soon! 

To apply for our next Brisbane market, keep a keen eye on our social channels, or sign up for our newsletter here: bit.ly/mailinglist-mfbe15`,`Brisbane SS17 Finders Keepers Market`,`Brisbane SS17 Finders Keepers Market`);
this.addEvent(`Brisbane Roar v Newcastle Jets`,`Brisbane Roar v Newcastle Jets`,`2017-10-22T16:00:00+1000`,`Suncorp Stadium`,`The Brisbane Roar will play Newcastle Jets at Suncorp Stadium on Sunday 22 October 2017.`,`Brisbane Roar v Newcastle Jets`,`Brisbane Roar v Newcastle Jets`);
this.addEvent(`Total solar eclipse in Brisbane, Australia`,`Total solar eclipse in Brisbane, Australia`,`2037-07-13T11:40:00+1000`,`Brisbane`,`"O dark, dark, dark, amid the blaze of noon,
Irrecoverábly dark, total eclipse
Without all hope of day!" - John Milton

The upcoming Total Solar Eclipse will be visible very soon. Make sure you have your eclipse glasses ready!

If you're in the city (specifically the GPO), the eclipse will start at 11:42:11. Totality will begin at 13:16:24 and finish at 13:17:31.

Totality will not be visible in parts of the northside. Your best bet is to watch the eclipse on the southside (or go on a road trip to Byron Bay).

Please remember to share this event and invite your friends :)

This NASA link will give you more info:

http://eclipse.gsfc.nasa.gov/SEgoogle/SEgoogle2001/SE2037Jul13Tgoogle.html`,`Total solar eclipse in Brisbane, Australia`,`Total solar eclipse in Brisbane, Australia`);
this.addEvent(`Brisbane Roar v Newcastle Jets`,`Brisbane Roar v Newcastle Jets`,`2017-10-22T16:00:00+1000`,`Suncorp Stadium`,`Brisbane Roar take on a newly invigorated Newcastle Jets at Suncorp Stadium. The Roar will look to bounce back this Sunday at a family friendly time of 4pm - bring along the tribe and enjoy an afternoon of football.`,`Brisbane Roar v Newcastle Jets`,`Brisbane Roar v Newcastle Jets`);
this.addEvent(`PINK - Brisbane Entertainment Centre Australia`,`PINK - Brisbane Entertainment Centre Australia`,`2018-08-14T19:00:00+1000`,`Brisbane Entertainment Centre`,`#BeautifulTraumaTour 
Renowned around the world as one of the most dynamic live performers of her generation, Australia’s favourite international pop icon, P!NK, has announced her Beautiful Trauma World Tour will hit Australia and New Zealand in July - September of 2018.

TICKET LINKS:
◈ goo.gl/csscBL
◈ tinyurl.com/Pink-14-August-Brisbane
◈ tinyurl.com/BeautifulTramaTour2018

PRESALES:
Telstra - Mon 16 October at 11.00am
LN - Wed 18 October at noon

GENERAL SALE:
Friday 20 October at 11.00am

TICKET LIMITS:
Wild Hearts Zone - 2 per transaction
All other tickets - 4 per transaction

TICKET PRICES:
A Res - $254.55
B Res - $203.60
C Res - $173.05
D Res - $101.75
General Admission - $203.60
* Face value of ticket only - does not include booking + delivery fees`,`PINK - Brisbane Entertainment Centre Australia`,`PINK - Brisbane Entertainment Centre Australia`);
this.addEvent(`Brisbane Etsy Made Local Market`,`Brisbane Etsy Made Local Market`,`2017-11-24T17:00:00+1000`,`Brisbane Showgrounds`,`The Brisbane Etsy team are proudly hosting this year's Etsy Made Local Brisbane Market again!  The market will feature local and talented Etsy sellers, workshops and demonstrations.

Make it a handmade Christmas and get your shopping started early this year. 

FAQ:
WHEN IS THE EVENT?
5pm – 9:30pm, Friday November 24th, 2017
10am - 4pm, Saturday November 25th, 2017.

WHERE IS THE EVENT BEING HELD?
Exhibition Building, Brisbane Showgrounds
Ample parking available

Apply to be a market stallholder here: https://goo.gl/forms/9jjPV4MqcmUljwg12
Applications close August 1.`,`Brisbane Etsy Made Local Market`,`Brisbane Etsy Made Local Market`);
this.addEvent(`Brisbane Fair Trade Christmas Market 2017`,`Brisbane Fair Trade Christmas Market 2017`,`2017-11-25T08:00:00+1000`,`QSAC - Queensland Sport and Athletics Centre`,`One stop shop for all your ethically sourced handcrafted Christmas gifts and decorations.

Saturday 25th November: 8:00am - 6:00pm
Sunday 26th November: 8:00am - 3:00pm

Market Stall Holders: 
Community Projects Worldwide
Oxfam Shop
Siham Craftlink
Samana Living
Penh Lane
Book Shack
Native Interiors
Handmade and Fairtrade
Threadmill
Mingalaba
Earthlink Handcrafts
Mamitas
Multiculti Co
Nepal Australia Friendship Assoc.
Kashae FT Emporium
Fine Little Things
The Leisa Tree
Sinerji
Himalayan Connection

-Kids Face Painting & Ballooning
-No ATM Facilities - Most stalls however have eftpos.
-Fair Trade Tea & Coffee 
-On-site Cafe
-Oxfam Games Area - Enjoy playing Pucket, Carrom, Bagh Chai, Chinese Checkers, Chess, Backgammon, Dominos & Mancala
-Disabled Access
-Plenty of parking and air-conditioned venue!

***We are fully booked for this years market*** If you are a Fair Trade business and interested in being placed on the wait list incase we have any openings closer to the event please get in contact with us at sihamcraft@optusnet.com.au`,`Brisbane Fair Trade Christmas Market 2017`,`Brisbane Fair Trade Christmas Market 2017`);
this.addEvent(`Brisbane Marathon Festival 2018`,`Brisbane Marathon Festival 2018`,`2018-08-05T06:00:00+1000`,`Brisbane Marathon Festival`,`Join us for the 27th annual Brisbane Marathon Festival on 5th August 2018.

Start planning your adventure and invite a mate to join and be a part of Brisbane's major marathon in 2018.`,`Brisbane Marathon Festival 2018`,`Brisbane Marathon Festival 2018`);
this.addEvent(`Drake | Brisbane`,`Drake | Brisbane`,`2017-11-10T20:00:00+1000`,`Brisbane Entertainment Centre`,`Drake Announces Australian Tour Dates!

The multiple Grammy Award-winning Canadian will arrive in New Zealand for a show on November 3 before playing back-to-back shows in Sydney (7 and 8), one night in Brisbane (November 10) and two nights in Melbourne (18 and 20).

Tickets go onsale at Friday 15 September, 1pm, here:
► http://tidd.ly/5fec5a29`,`Drake | Brisbane`,`Drake | Brisbane`);
this.addEvent(`Lorde | Brisbane`,`Lorde | Brisbane`,`2017-11-23T19:00:00+1000`,`Riverstage`,`Lorde announces world tour including New Zealand and Australia dates!

Lorde has announced details of a world tour in support of her upcoming album ‘Melodrama’.

Ella Yelich-O’Connor will release her long-awaited second album ‘Melodrama‘ on June 16. She has already shared three songs from it – ‘Green Light‘, ‘Perfect Places’ and ‘Liability‘ – while she has also performed another new track, ‘Homemade Dynamite‘, live.

Get your tickets, here:
➢ http://tidd.ly/3557229c`,`Lorde | Brisbane`,`Lorde | Brisbane`);
this.addEvent(`Brisbane Airport Hotel Group Raceday`,`Brisbane Airport Hotel Group Raceday`,`2017-11-18T10:30:00+1000`,`Doomben Racecourse`,`Enjoy the spring sunshine with a day at the races on Saturday, 18 November.

There is no better way to kick off the silly season festivities than with a day at the races. With live racing, exquisite food and drink, and live entertainment in our Public Bar after the final race you will have the ultimate day out.

There’s something available to suit every raceday style – Packages and tickets start from $25pp right through to exclusive A Claus for Celebration Marquee tickets from $155pp.`,`Brisbane Airport Hotel Group Raceday`,`Brisbane Airport Hotel Group Raceday`);
this.addEvent(`(Brisbane) Star Arts Festival! - 19 August`,`(Brisbane) Star Arts Festival! - 19 August`,`2018-04-27T13:00:00+1000`,`RedStar Circus`,`(Brisbane) Star Arts Festival!

Brisbane is home to many artistic geniuses in a variety of different realms of art.

Come and join us in an interactive celebration of live visual, audible and performing arts!

Circus Arts
Live Music
Djs
Dancing
Sound Healing 
Live Art
Workshops 
Interactive Performance
Market Stalls
Fire and Flow Arts

There will be family friendly activities throughout the day.. And as night falls.. 
The darker arts shall emerge! 
(MA15+ only recommended after 6pm).

Purchase tickets online to save!
Family, Student and Concession options available..
https://brisbanetickets.com.au/event/brisbane-star-arts-festival-4324

Online Tickets: 
Adults $25
Concession $20
Child (Under 15) $15
Family $60

Gate Tickets (if we haven't reached capacity):
Adults $35
Concession $30
Child (Under 15) $23
Family $80


If you would like to apply to volunteer, have a stall or be part of the live performance team shoot an email to rebecca@redstarfitness.com.au
Applications Close 30 June`,`(Brisbane) Star Arts Festival! - 19 August`,`(Brisbane) Star Arts Festival! - 19 August`);
this.addEvent(`Brisbane Vegan Markets October (changed hours)`,`Brisbane Vegan Markets October (changed hours)`,`2017-10-22T09:00:00+1000`,`Rumpus Room (Official)`,`Hey Friends,

For this event and this event only we have had to changed the hours, a certain festival unbenounced to our knowledge till last week has decided to close down the steets out side our event so we are shuffling the hours to give our stalls access.

We will still be bouncing and rocking away as per usual.`,`Brisbane Vegan Markets October (changed hours)`,`Brisbane Vegan Markets October (changed hours)`);
this.addEvent(`Supanova Brisbane 2017`,`Supanova Brisbane 2017`,`2017-11-10T13:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`I will be attending the Brisbane Supanova Expo on the 2 1/2 days.  Due to guests only starting to be announced, I do not have a complete cosplay line up as yet.  But once I know what cosplays I am wearing, I will update this description.`,`Supanova Brisbane 2017`,`Supanova Brisbane 2017`);
this.addEvent(`Brisbane Lawyers Cash Kings Drifting Comp 2017`,`Brisbane Lawyers Cash Kings Drifting Comp 2017`,`2017-10-22T09:30:00+1000`,`Asian Auto Spares Drift Park Archerfield`,`In a first ever of its kind drift event, we would like to introduce the very first Brisbane Lawyers Cash Kings top 32 drift competition.
We are offering $16000 in cash prizes with cash being paid down to 8th position. These drivers from all over Australia are going to be pushing to the limit to take a chunk of the biggest prize pool ever for a drifting event in Australia. 
The event will run in a grudge match style without qualifing. If a grudge match can't be secured they will pick there battles out of a hat.
Other entertainment includes trade stands, dj's spinning beats all day, international guest judges and more.
*Drifters To enter go to https://admin76773.wixsite.com/driftchallengeaust/register to apply for your spot as positions are limited and go through a selection process with only 7 spots left.
***********Spectators $20**********
***********Kids under 12 free********`,`Brisbane Lawyers Cash Kings Drifting Comp 2017`,`Brisbane Lawyers Cash Kings Drifting Comp 2017`);
this.addEvent(`Supanova Brisbane 2017`,`Supanova Brisbane 2017`,`2017-11-10T13:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`Brisbane Supanova is back for 2017!
Unleash your inner geek and celebrate all that is cool, awesome and nerdy at Supanova!

Beserk will be there selling some of our amazing range of clothing, cosmetics, hair colours, shoes, homewares & collectables. So make sure you drop by!

❤️❤️❤️

For more event & guest information, visit the Supanova website here>> www.supanova.com.au
Supanova brings you celebrity guests, an expansive show floor full of the latest merchandise, an amazing gaming zone, cosplay, plus so much more! 

See you there!
Beserk xx`,`Supanova Brisbane 2017`,`Supanova Brisbane 2017`);
this.addEvent(`Supanova Brisbane 2017`,`Supanova Brisbane 2017`,`2017-11-10T10:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`SupaNova Brisbane is on November 10 to 12! Come down to the Brisbane Convention and Exhibition Centre this weekend and enjoy all that Supanova has to offer! :)`,`Supanova Brisbane 2017`,`Supanova Brisbane 2017`);
this.addEvent(`Stormzy | Brisbane`,`Stormzy | Brisbane`,`2018-01-04T20:00:00+1000`,`Eatons Hill Hotel`,`ASTRAL PEOPLE & Handsome Tours present.. 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Stormzy (UK)
Gang Signs & Prayer Australian Tour 🙏🏿 🇦🇺

Thu 4th January | Eatons Hill Hotel, Brisbane

Tickets  → http://bit.ly/StormzyBrisbane
Stream 'Gang Signs & Prayer' → http://smarturl.it/Stzsyalbumit

ALL AGES EVENT
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
This New Year, Astral People and Handsome Tours are pleased to announce the return of Stormzy.

Following a completely sold out national tour in July, Stormzy will return to Australia & New Zealand for only one headline show in Brisbane, alongside a run of New Year’s festivals.

It’s hard to believe that Stormzy only burst onto the scene in 2013 with his ‘Wicked Skengman’ Youtube series, where he would spit over classic grime beats in his local neighbourhood. With an ever-expanding fanbase, Stormzy released his debut EP Dreamers Disease in 2014, featuring critically acclaimed R’n’B style tracks such as ‘Stormtrooper’, one of his most conscious tracks to date. Dreamers Disease highlighted the versatility that Stormzy carefully carves through his music - a skill that would later be cemented in his chart-topping album Gangs Sign & Prayer.

In 2015, without any label or radio support, he was the first ever unsigned rapper to make the BBC Sound of.. shortlist. Perhaps some of his most famous Youtube releases, ‘Shut Up’ and ‘Wicked Skengman 4’ both feature his unique DIY style and unmatchable flow, securing Stormzy’s rightful place on the UK Top 20 Charts. With Kanye then inviting Stormzy to join him on stage at the Brit Awards, he was thrust into the global spotlight.

This year saw the release of his debut album, Gangs Sign & Prayer. Met by an unparalleled response, all 16 tracks were featured in the Spotify Top 50 within just 72 hours of its release. Travelling across genres & feelings, the LP features global hits like ‘Big For Your Boots’, ‘Cigarettes & Cush (feat Kehlani)’ and, the one that started it all, ‘Shut Up’. Celebrating the record with an enormous GSAP World Tour, Stormzy brought the sound of the UK underground to sold out shows in every pocket of the globe. 

Don’t miss your chance to see one of the UK’s most innovative and talented young MC’s bring his rapid fire rhymes to Brisbane, for his only headline show on this tour. January 4th at Eatons Hill Hotel - Stormzy is ready to shut it down.
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

Tickets on-sale 10am Thu 7 September → http://bit.ly/StormzyBrisbane`,`Stormzy | Brisbane`,`Stormzy | Brisbane`);
this.addEvent(`Slideapalooza Brisbane 2018`,`Slideapalooza Brisbane 2018`,`2018-01-13T09:00:00+1000`,`Sirromet Wines`,`Congratulations Brisbane!!!!! 

You have secured the one and only Slideapalooza waterslide event in Australia for summer 2017/18.

This summer .... we will be setting up the world's largest collection of waterslides at Sirromet Winery from Jan 13th to Jan 21st 2018.

We will launch the event over six days so we have two full weekends and a couple school holiday weekdays in between. 

Saturday 13th
Sunday 14th
Mon 15th

Fri 19th
Sat 20th
Sun 21st

There are 3 sessions per day, all sessions are 2.5 hours long and capped so everyone enjoys LOTS of sliding in each session.

Session times are as follows ......

Morning - 9am - 11.30am 
Midday - 11.30am to 2pm
Afternoon - 2pm to 4.30pm

Your event will open for PreSale on the 10th of August 2017 with PreSale lasting 8 weeks.

PreSale is the chance to secure a spot for just $1 deposit per ticket (balance automatically taken on 11th October 2017) and at the cheapest price per ticket available for the event. 

Pre Sale Ticket Prices - 
Adult $49, 
Kids (4 to 15) $29, 
Children (under 4) Free.

The first 4000 Adult tickets purchased in PreSale will get a FREE Slideapalooza Beach towel valued at $20 (pick up at event).

The first 4000 Kids tickets purchased on PreSale will get a FREE Slideapalooza Slide Ring valued at $10 (pick up at event).

To be any chance at scoring the freebies though, you will need to be on our VIP list for the event. 
Slide VIP's get the rego link emailed to them 2 hours before the general public and tickets will sell FAST!!

Below are a bunch of links for more info while we set up PreSale for y'all. This page is a great resource for all things slide so make sure all your slide buddies are on it.

VIP Sign Up - http://bit.ly/SlideBris-VIP

Website - www.slideapalooza.com

FAQ's - www.slideapalooza.com/faq

Volunteer - https://slideapalooza.com/volunteer/

Vendors - https://slideapalooza.com/bris17-food-vendor-app/

Sponsorship / Corporate - promotions@slideapalooza.com

Facebook Page - https://www.facebook.com/slideapalooza/

Instagram - https://www.instagram.com/slideapalooza/

See you this summer :)`,`Slideapalooza Brisbane 2018`,`Slideapalooza Brisbane 2018`);
this.addEvent(`Brisbane Burger Fest (FREE ENTRY)`,`Brisbane Burger Fest (FREE ENTRY)`,`2017-10-21T11:00:00+1000`,`The Triffid`,`******* TICKET INFORMATION *******
Our full allocation of free reserved tickets have now been exhausted. We won't be releasing anymore free RSVP tickets. Tickets will guarantee entry, however we'll still be allowing people without tickets in when there is space within the festival area. To reiterate, don't be worried too much about not having a ticket, you may still get in, but there could be a wait depending on how full the festival is when you arrive.
******* TICKET INFORMATION *******

Stone & Wood and The Triffid present Brisbane’s first burger festival, Burgerfest

 Good people of Brisbane, ready your stomachs. It’s time to dust off those stretchy pants and prepare to get your hands greasy. Stone & Wood and The Triffid are proud to present Brisbane's first burger festival, Burgerfest. On October 21, The Triffid will be shutting down Stratton Street and bringing in the big guns, with Brisbane’s best burger joints setting up shop in Newstead for one day only. 

“Brisbane’s best burger" is a contentious title, but Burgerfest will give you opportunity to settle the debate for good. The festival will feature a line-up of Brisbane’s most famed buns, with Ze Pickle, Miss Kay’s, Ben's Burgers, Mr Burger, 5 Boroughs, Red Hook, Lucky Egg and The Triffid’s own burgers hitting the grill. Each store be offering up their loved classics along with an exclusive Burgerfest burger. Arrive hungry, because we guarantee you’ll want to eat your way from one end of Stratton Street to the other.

Burgerfest is a FREE event, and will not only be host to Brisbane’s best burgers, but also burger eating competitions and live music all day in the Triffid Beer Garden. 

Get ready to grab October 21 with both hands and leave all inhibitions at the door. Burgerfest will be taking over Stratton Street, Newstead all day and is a free event.`,`Brisbane Burger Fest (FREE ENTRY)`,`Brisbane Burger Fest (FREE ENTRY)`);
this.addEvent(`Evanescence | Brisbane`,`Evanescence | Brisbane`,`2018-02-11T20:00:00+1000`,`Brisbane Entertainment Centre`,`Evanescence Announce February Australian Tour!

Prepare your awkward inner goth to lose their shit, because Evanescence have stopped the teasing and announced their long-awaited return to Australia for a 2018 headline tour.

After recently bringing themselves (back) to life with new single ‘Imperfection’, the noughties dark rockers (now sans founding guitarist Ben Moody) will be heading to Australia in February for their first tour since 2012, and what’s more, they’ll have an orchestra in toe.

Tickets on sale to general public 12pm Monday, 9th October:
► http://tidd.ly/72ac3e81`,`Evanescence | Brisbane`,`Evanescence | Brisbane`);
this.addEvent(`Brisbane Freddy Pop-up Store - 2 Days only!`,`Brisbane Freddy Pop-up Store - 2 Days only!`,`2017-10-21T09:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`Brisbane gals it has been too long, but we are coming back, bigger & better than ever - with EXCLUSIVE OFFERS - so get ready! 

The FREDDY POP-UP Store will be at the Brisbane Fitness Show 2017! We will have an extended range from our Fashion, Denim & Sportswear collections including our latest styles plus EXCLUSIVE Fitness Show offers! 

WHERE: Booth #F18 - Brisbane Convention & Exhibition Centre (Inside the Fitness Show 2017)
WHEN: 21st - 22nd October 2017
TIME: 9am - 5pm

If you have always wanted a pair of FREDDY pants but want to try them first or need to add to your collection, you cannot miss this!! 

Get fitted into the perfect pair of FREDDY's by one of our highly trained team in one of our 5 fitting rooms, discover new styles and colours AND get more for less with EXCLUSIVE SHOW OFFERS!

Browse the range now at www.freddystore.com.au
RSVP NOW and receive 20% off tickets when you pre-book online (Use code EXH) - http://bit.ly/2y95GBd`,`Brisbane Freddy Pop-up Store - 2 Days only!`,`Brisbane Freddy Pop-up Store - 2 Days only!`);
this.addEvent(`Reclaim the Night Brisbane`,`Reclaim the Night Brisbane`,`2017-10-27T18:00:00+1000`,`144 George St, Brisbane City QLD 4000, Australia`,`For four decades RTN has brought women together to end violence, especially domestic and sexual violence, against women. All women, children and gender non-conforming folk are invited to join us to take back the streets and march together in solidarity. Men are welcome to attend the rally before the march.

In 2017, at least 1 in 3 women in Australia experience sexual violence. Reclaim the Night (RTN) is a longstanding grassroots protest movement which breaks the silence around men’s sexual violence against women, children and gender diverse people. RTN demands an end to patriarchal violence and systems which re-traumatise survivors by reclaiming and transforming the streets into a safe place for all women – day and night. RTN also calls for perpetrators of sexual violence to be held accountable. Marching through the streets is an act of resistance which empowers survivors of sexual violence. We join together as a community united in recovery. This year’s RTN is brought to you by survivors and allies collectively fighting against sexual violence.
*Safety for survivors in all spaces and places, day & night*  *Let’s all unite, it’s our right* *It’s enough, stop making reporting so tough*

If any survivor of sexual or domestic violence needs support please contact the services below:
Brisbane Rape and Incest Survivors Support Centre (BRISSC) -http://www.brissc.org.au/ 3391 2573
1800 RESPECT (1800 737 732) - https://www.1800respect.org.au/ 
DV Connect – http://www.dvconnect.org/
Women's Line - 1800 811 811
Men's Line - 1800 600 636
Immigrant Women's Support Service - 07 3846 5400
Zig Zag – Young Women's Resource Centre 07 3843 1823
Murrigunyah Aboriginal & Torres Strait Islander Corp for Women - 07 3290 4254
Living Well (men's service) - https://www.livingwell.org.au/ 07 3028 4648`,`Reclaim the Night Brisbane`,`Reclaim the Night Brisbane`);
this.addEvent(`Grouplove - Brisbane`,`Grouplove - Brisbane`,`2018-02-09T20:30:00+1000`,`The Triffid`,`Prepare yourselves Australia, because indie-pop hit-makers Grouplove will be hitting stages and thrilling audiences across the country in 2018! Much-loved visitors to our shores, the Californian band will be playing what are sure to be a wild night in Brisbane! 

Currently touring across America, Grouplove will be bringing their energetic live show and infectious tunes to Australia for the first time in more than 18 months. Be sure to get your dancing shoes on, because they’ll be sure to have their new single ‘Remember That Night’ in tow, along with a setlist chock full of fan favourites from all three of their albums.

Don’t miss out, get access to the presale and buy tickets from Wednesday 18 October 9am. General on sale kicks off Thursday 19th October 9am via http://scrtsnds.co/Grouplove2018`,`Grouplove - Brisbane`,`Grouplove - Brisbane`);
this.addEvent(`2017 Brisbane Convoy for Kids`,`2017 Brisbane Convoy for Kids`,`2017-11-04T10:30:00+1000`,`Redcliffe Showgrounds`,`The convoy travels from 651 Johnson Rd Forest Lake leaving 9:30 am Sharp and travels to Redcliffe Showgrounds where there will be a truck and ute show , rides, stalls, displays entertainment, fireworks, raffles and auction for the whole family.`,`2017 Brisbane Convoy for Kids`,`2017 Brisbane Convoy for Kids`);
this.addEvent(`Harry Styles | Brisbane`,`Harry Styles | Brisbane`,`2018-04-28T19:00:00+1000`,`Brisbane Entertainment Centre`,`Harry Styles has extended his world tour into 2018 with 56 new shows.

In addition to shows across the UK, Europe, the US and Canada, the tour also visits Asia, South America, Mexico and Australia, with support coming from Kacey Musgraves, Warpaint, Leon Bridges on select dates, while special guests for Europe and Australia are to be announced soon.

The sold out first leg of the tour kicks off this September, visiting intimate venues around the world and featuring support from MUNA.

Styles is touring behind his self-titled debut album, which arrived in May. 

Get your tickets, here:
➢ http://tidd.ly/a078bcc`,`Harry Styles | Brisbane`,`Harry Styles | Brisbane`);
this.addEvent(`Supanova 2017 - Brisbane`,`Supanova 2017 - Brisbane`,`2017-11-10T13:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`Supanova Comic Con & Gaming is Australia's premier pop culture event, where fandom comes to life! We celebrate the worlds of film and television, fantasy, comic books, anime, sci-fi, cartoons, books, gaming and collectables.
 
Join us for three massive days of Supa-Star celebrities, ‘cosplay’ (costume-role play), fan clubs, musical performances, creative master classes, celebrity Q&As, wrestling, tournaments and competitions, and a hall full of shopping possibilities.
 
It's a family event and there’s something for everyone!
 
Want to know more?

http://www.supanova.com.au/events/brisbane-2017/about/
https://www.facebook.com/supanovaexpo/
www.supanova.com.au
 
#brisnova
#supanovaexpo`,`Supanova 2017 - Brisbane`,`Supanova 2017 - Brisbane`);
this.addEvent(`Rise Against | Brisbane`,`Rise Against | Brisbane`,`2018-02-14T19:30:00+1000`,`Riverstage`,`Rise Against reveal headline tour dates for 2018!

Chicago punks, Rise Against, have confirmed plans to tour Australia in 2018.

Bringing their Wolves tour cycle down under, the US quartet will play five headline shows across Oz in February.

They’ll also be joined by California outfit SWMRS for all dates, which see them play Perth, Adelaide, Melbourne, Sydney and Brisbane at the beginning of next year.

Talking about the new record, which they recorded in Nashville with producer Nick Raskulinecz ( Foo Fighters, Alice In Chains), Rise Against frontman Tim McIlrath said, “In many ways, a Rise Against show is a safe space for our fans.

“But I realised… I want to create dangerous spaces where misogyny can’t exist, where xenophobia can’t exist. I want to create spaces where those sentiments don’t have any air, and they suffocate: where those ideas die.

“Wolves isn’t about creating a safe space, it’s about creating a space that’s dangerous for injustice.”

Get your tickets, here:
http://tidd.ly/4e449c1e`,`Rise Against | Brisbane`,`Rise Against | Brisbane`);
this.addEvent(`Tim Rogers | Brisbane Powerhouse`,`Tim Rogers | Brisbane Powerhouse`,`2017-10-30T19:30:00+1000`,`BRISBANE POWERHOUSE`,`Joining us at Brisbane Powerhouse for the popular What Rhymes with Cars and Girls | Brisbane Powerhouse, Tim Rogers will sit down with Paul Barclay to reflect on his life, his career in music and his recently published memoir Detours, an offbeat and immensely charming literary memoir.

As one of Australia’s most enduring rock legends, Rogers is a contradiction: a hard-drinking rock star with the soul of a poet; a wordsmith and a raconteur, a romantic and a realist, a bon vivant and a loner.

He’s the wild man of Australian rock n’ roll, a footy playing dandy who was brought up in the wild emptiness of Kalgoorlie, but he’s now an urban shadow – a legend of Australian rock music, more often than not in transit, but with a key jingling in his pocket, looking for an opportunity, one day, to get home.

The evening promises to be revealing, warm, self-deprecating, intimate, shocking, confessional, sharp, funny and immensely engaging.

Tim Rogers will be signing copies of Detours on the evening courtesy of Riverbend Books.

Writers+Ideas is supported by O’Neill Architecture and RPS`,`Tim Rogers | Brisbane Powerhouse`,`Tim Rogers | Brisbane Powerhouse`);
this.addEvent(`Walk4BrainCancer 2017 - Brisbane`,`Walk4BrainCancer 2017 - Brisbane`,`2017-10-29T08:30:00+1000`,`New Farm Park`,`Walk4BrainCancer is a nation-wide movement of people taking to their feet at walks across the country and fundraising to support brain cancer research.

The annual Walk4BrainCancer in Brisbane is on Sunday 29 October and is set to be a fantastic day out to raise awareness and funds for this important cause.

Join Cure Brain Cancer Foundation, in partnership with the Newro Foundation, for an inspirational 5km walk through New Farm Park. 

The path caters for walkers of all levels and is suitable for wheelchairs and strollers. You can walk as many laps as you like!

Following the walk, enjoy a gourmet BBQ and entertainment for all ages.`,`Walk4BrainCancer 2017 - Brisbane`,`Walk4BrainCancer 2017 - Brisbane`);
this.addEvent(`Downshift Brisbane Meet - Nov 2017`,`Downshift Brisbane Meet - Nov 2017`,`2017-11-05T15:00:00+1000`,`Beenleigh Showgrounds`,`November 2017 Downshift Meet - Food, drinks, trade stalls, DJ, good times! 》$5 Per Person《 

*****Please come and go in a quiet and calm fashion.*****
*****No people standing up outside the gates. This is not safe, and attracts the WRONG behaviour*****

We will have a camera at exit recording, so please don't make us use the footage. We have previously, and will not hesitate to do so to protect the event. Respect the event, the showgrounds and the residents!

The CONDITIONS OF ATTENDANCE are the same as always:
- YOU are responsible for the people you bring to the meet, and hang with. If they act like idiots, we will find out who it was. Brisbane is a very small place.
- THROW RUBBISH IN THE BINS. Use them, we put them up for you guys. If they're full, just chuck it in your car and throw it out next time you fill up.
- ABSOLUTELY UNDER NO CIRCUMSTANCES SKID TO LEAVE. PLEASE LEAVE QUIETLY SO THAT WE WILL BE WELCOMED BACK

The meets are open to ANY cars, whether they be JDM, Euro, Hot Rod or Aussie. The idea is to have like-minded, respectful, appreciative people there, who can also follow some very basic rules. IF you can do those things, we'll see you at the meet, and you'll be welcomed with open arms for a great, chilled afternoon.

Don't forget to ask the Downshift Promo Girls for a photo! 

If you have a business that would benefit from a trade stand whether it be food, drinks or automotive related, please email kat@downshiftaus.com to enquire. We would love to have you there!`,`Downshift Brisbane Meet - Nov 2017`,`Downshift Brisbane Meet - Nov 2017`);
this.addEvent(`Ed Sheeran | Brisbane`,`Ed Sheeran | Brisbane`,`2018-03-20T20:00:00+1000`,`Suncorp Stadium`,`Ed Sheeran will bring his ÷ world tour to stadiums across Australia and New Zealand next March!

The tour, which has already weaved its way through Europe and the UK, will head down under for stadium shows in Perth, Adelaide, Melbourne, Sydney, Brisbane, Auckland and Dunedin between March 3 and 29.

Opening acts will be announced at a later stage, while tickets are on general sale at staggered times across the states on May 23.

The tour shares its name with the singer-songwriter's third album, ‘÷’, which was released earlier this year.

Tickets go onsale at May 23, here: http://tidd.ly/6204c503`,`Ed Sheeran | Brisbane`,`Ed Sheeran | Brisbane`);
this.addEvent(`Royal Blood | Brisbane`,`Royal Blood | Brisbane`,`2018-05-07T19:00:00+1000`,`Riverstage`,`Royal Blood Announce Biggest Australian & NZ Tour Ever For 2018!

British rockers Royal Blood have announced a set of huge 2018 Australian tour dates ahead of their appearance at Splendour In The Grass this weekend.

Get your Royal Blood tickets, here:
➢ http://tidd.ly/65082c3a

The duo of Mike Kerr and Ben Thatcher have revealed that they’ll return to Australia in April next year, to play their biggest Aussies shows to date at massive venues in Sydney and Melbourne, as well as their first-ever shows in Brisbane and Perth. Interestingly, the tour dates match up pretty well with when Groovin The Moo festival is typically held.

One of the world's fastest-rising rock acts is also on its way to New Zealand - but there's a royal wait involved for those who want to see them.

Royal Blood have announced plans to play their first headlining shows in Auckland and Wellington after last performing here as one of the highlights of the 2015 Laneway Festival.

But it's not happening for a while. The Brighton duo of Mike Kerr and Ben Thatcher aren't scheduled to play until May.

Royal Blood are currently touring in support of their latest album How Did We Get So Dark?, which is the follow-up to their self-titled debut album which dropped back in 2014.

“Can’t wait to come back over next year and do some bigger shows and get out to places we’ve never played before,” the pair say.

“We hope you’re enjoying the new album & we’re excited to play you these new songs. Hope to see you there!”

Get your Royal Blood tickets, here:
➢ http://tidd.ly/65082c3a`,`Royal Blood | Brisbane`,`Royal Blood | Brisbane`);
this.addEvent(`Jack Johnson | Brisbane`,`Jack Johnson | Brisbane`,`2017-12-03T17:00:00+1000`,`Riverstage`,`Jack Johnson returns this summer playing all your favourite songs, under the stars at some Australia and New Zealand's finest outdoor venues!

Tickets will be available here on September 11:
► http://bit.ly/JackJohnson-Australia
► http://tidd.ly/87c1c80

JACK JOHNSON and his band return this summer playing all your favourite songs outdoors, under the stars, touring in support of his forthcoming studio album, All The Light Above It Too. 

Last here in 2013, Jack Johnson 2017 Summer Tour will see Johnson performing at some of Australia’s finest outdoor venues including Melbourne’s Sidney Myer Music Bowl, Brisbane’s Riverstage, Perth’s stunning Kings Park and Botanic Garden and on the Sydney Opera House Forecourt this December.`,`Jack Johnson | Brisbane`,`Jack Johnson | Brisbane`);
this.addEvent(`The Weeknd | Brisbane`,`The Weeknd | Brisbane`,`2017-12-06T19:00:00+1000`,`Brisbane Entertainment Centre`,`The Weeknd Announces Fall Tour Dates With Gucci Mane!

The Weeknd just wrapped the American leg of his spring tour—titled Legend of the Fall—and has now announced a new set of dates that will actually take place in the season for which the tour is named. The second round of Legend of the Fall dates in the U.S. will have The Weeknd criss-crossing the country from September through November. Though venues have not yet been announced, he will be playing arenas in each city, along with Gucci Mane and Nav, the Canadian rapper signed to his label.

The Weeknd also released a small set of dates in Canada, Australia, and New Zealand along with French Montana and Nav. In the meantime, he has a slate of European summer festival dates. This is not an official FB event.

Get your tickets, here:
➢ http://tidd.ly/6d6e2276`,`The Weeknd | Brisbane`,`The Weeknd | Brisbane`);
this.addEvent(`Cashmere Cat | Brisbane`,`Cashmere Cat | Brisbane`,`2017-11-24T20:00:00+1000`,`The Flying Cock`,`ASTRAL PEOPLE, Handsome Tours, Mutual Friends & FBi Radio present.. 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Cashmere Cat (NOR) 
with special guest Nina Las Vegas

Fri 24th November | The Flying Cock, Brisbane

Sign up for exclusive pre-sale via theflyingcock.com.au
Pre-sale sign up: 10am AEST Tues, Aug 1
Pre sale period: 10am AEST Thurs, Aug 3 - 9am AEST Mon, Aug 7 
General on-sale: 10am AEST Mon, Aug 7

Stream Casmere Cat's debut album '9'→ smarturl.it/9CashmereCat
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Globally acclaimed, electronic all-star Cashmere Cat today announces he’ll be visiting Australian shores this November, for a national headline tour presented by Astral People & Handsome Tours.
 
Following his debut album 9, which was released earlier this year, the Grammy-nominated, genre-slicing artist will be bringing his eclectic, left-field live show to select capital cities in Australia. Kicking off in Sydney, on November 23 at the Metro Theatre, Cashmere Cat will head north to Brisbane’s The Flying Cock on November 24. Next he’ll head to Canberra to perform at Spilt Milk Festival on November 25, before heading to Melbourne’s Howler on November 29. The tour will wrap in Adelaide on December 1 at the Fat Controller.
 
Hailing from Norway, the now LA-based Cashmere Cat otherwise known as Magnus August Høiberg, has been warping the boundaries of electronic music since emerging in 2012 with debut EP Mirror Maru. The EP’s combination of crunching synthesisers and off-kilter R&B quickly cemented Høiberg's sound. Lending Soundcloud remix treatment to the likes of Jeremih and 2 Chainz, Høiberg caught the attention of LA super-producer & mentor Benny Blanco. Together with Blanco, Høiberg went on to collaborate with numerous pop heavyweights including Tinashe, Charli XCX, Selena Gomez, Ariana Grande, Wiz Khalifa and Ludacris. Høiberg has even lent his craft to Yeezy himself, co-producing “Wolves” from Kanye West's 2016 LP Life of Pablo. Høiberg humbly commenting, “I’m the biggest Kanye fan in the world, and when they premiered 'Wolves', it was one of the most exciting days of my life."
 
In April this year, Høiberg released his highly anticipated debut album 9 - a long-in-the-works masterpiece, arriving via Mad Love Records and Interscope. As expected, the album features an impressive list of talent including Tory Lanez, The Weeknd, Ariana Grande, Ty Dolla $ign, Francis and the Lights, Kehlani, MØ and Jhené Aiko.
 
Joining Cashmere Cat on tour is very special guest Nina Las Vegas. One of the most influential figures in Australian music, Vegas passionately dedicates herself to promoting and celebrating the sounds of underground electronic music from both Australia and abroad. Together with her own music, Vegas has released music for Swick, Air Max ‘97, Lewis Cancut and Hi Tom on her esteemed label NLV Records. She's also played sets at every major Australian festival including Splendour In The Grass, Stereosonic, Big Day Out, Parklife and Groovin The Moo, as well as Coachella, HARD and Holy Ship internationally.
  
Cashmere Cat is currently in the middle of a mammoth world tour visiting North America, Europe and the UK, before making his way to Australia for a highly awaited return, supported by Nina Las Vegas across the country. With millions of online streams, a prolific resume of remarkable talents and a critically acclaimed album now under his belt, do not miss your chance to see this once in a decade producer. 
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Sign up for exclusive pre-sale via theflyingcock.com.au
Pre-sale sign up: 10am AEST Tues, Aug 1
Pre sale period: 10am AEST Thurs, Aug 3 - 9am AEST Mon, Aug 7 
General on-sale: 10am AEST Mon, Aug 7`,`Cashmere Cat | Brisbane`,`Cashmere Cat | Brisbane`);
this.addEvent(`The xx | Brisbane`,`The xx | Brisbane`,`2018-01-17T20:00:00+1000`,`Riverstage`,`The XX Announce 2018 Australian Tour With Kelela & Earl Sweatshirt

Tickets: 
► http://tidd.ly/a0f2f854 
► http://bit.ly/thexx-australia

The xx were one of the most in-demand acts in Australia around Splendour time, and now the headliners are making their way back for three big shows next year to quench the thirst of anyone who missed out.

Better yet, they’ll have some awesome support acts on board, with Kelela and Earl Sweatshirt making for a gig you’ll really want to get down early for.

The all-ages shows will continue the Splendour vibes by taking place on outdoor stages, and they’ll all be all-ages too – plus, The xx will be donating a dollar from each ticket to PLUS1’s local LGBTQI+ programs.

Shop here your The xx Shirt:
► Black: http://bit.ly/thexx-black
► White: http://bit.ly/thexx-white`,`The xx | Brisbane`,`The xx | Brisbane`);
this.addEvent(`Fitness Show Brisbane`,`Fitness Show Brisbane`,`2017-10-21T09:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`The Fitness Show Brisbane takes place from 21-22 October 2017 at the Brisbane Convention & Exhibition Centre. Bringing together the latest fitness and health trends, products, events and experiences including live workouts, fitness classes, seminars and cooking demonstrations, you’ll walk away feeling inspired and motivated.

This year’s Fitness Show contains three dedicated zones including an Active Zone, Strength Zone and Industry Zone. Each zone caters toward the interests of individuals passionate about leading a healthy and active lifestyle, bodybuilding and strength enthusiasts, as well as fitness industry professionals.

So whether you’re interested in HIIT, Yoga, CrossFit, Weightlifting, Powerlifting or leading an overall healthy lifestyle, you’ll find your tribe at the Fitness Show!

OPEN HOURS
Sat 21st: 9am - 5pm
Sun 22nd: 9am - 5pm

TICKETS ON SALE NOW
http://bit.ly/fs-bris`,`Fitness Show Brisbane`,`Fitness Show Brisbane`);
this.addEvent(`John Edward - Brisbane, QLD`,`John Edward - Brisbane, QLD`,`2017-11-09T19:00:00+1000`,`Sleeman Sports Complex`,`Due to demand a second date has been added! The first event sold out quickly so book your tickets now to avoid disappointment! 

Crossing Over With John Edward live in Brisbane, Queensland, Australia!

This is your chance to be part of a live group audience to watch John Edward connect with the other side. There will be question and answer sessions and messages from the other side. Is someone waiting to talk to you?

Tickets Available At Ticketmaster Australia:
http://www.ticketmaster.com.au/psychic-medium-john-edward-chandler-queensland-09-11-2017/event/130052A4D4198322?artistid=803926&majorcatid=10005&minorcatid=104&tm_link=search_msg-0_130052A4D4198322

Sleeman Sports Complex 
Chandler Theatre
Old Cleveland Rd & Tilley Rd
Chandler QLD 4155

Event 7:00pm-9:00pm

This event is a reserved seating event! 
No audio, video or photography allowed. 
No alcohol allowed inside event.

VIP Tickets now available!

The VIP Evolve tickets are good for entry into the event and:
A one year membership to Evolve (a $99 value) 
A special 20 minute after event called "Just Five More" that is a conversation, question and answer session with John and the other VIP ticket holders.
The opportunity to meet and take a photo with John at the end of the event.
A welcome package with mailed to you and more!`,`John Edward - Brisbane, QLD`,`John Edward - Brisbane, QLD`);
this.addEvent(`FOMO Brisbane 2018 **SOLD OUT**`,`FOMO Brisbane 2018 **SOLD OUT**`,`2018-01-06T11:00:00+1000`,`Riverstage`,`🎉 Welcome FOMO 2018 🎉 Our one-day, one-stage festival is returning to Brisbane Riverstage on Sat 6 January 2018. 

FOMO BRISBANE IS SOLD OUT! 

FOMO Brisbane is strictly 18+`,`FOMO Brisbane 2018 **SOLD OUT**`,`FOMO Brisbane 2018 **SOLD OUT**`);
this.addEvent(`Alt-J in Brisbane`,`Alt-J in Brisbane`,`2017-12-10T17:15:00+1000`,`Riverstage`,`Get tickets for Alt-J concert in Brisbane, 10 Dec 2017 on ConcertWith.Me - http://cwm.io/898ece

All tickets on Concertwith.Me covered by our guarantee.

You will receive a 100% refund for your tickets if:

- Your order was accepted but not delivered by the seller.
- Your order was accepted but not delivered in time for the event.
- Your event is cancelled and is not rescheduled.
- Your tickets were not valid for entry.
- You can purchase your tickets with peace of mind knowing we have you covered.`,`Alt-J in Brisbane`,`Alt-J in Brisbane`);
this.addEvent(`P!NK | Brisbane`,`P!NK | Brisbane`,`2018-08-14T20:00:00+1000`,`Brisbane Entertainment Centre`,`POP superstar P!nk will rock into Australian arenas with her Beautiful Trauma tour next year with 14 concerts lined up!

There will undoubtedly be some not-so-beautiful trauma for her hundreds of thousands of fans when tickets go on sale for the 14 concerts now revealed.

The What About Us singer holds the box office record for a female artist with more than 600,000 tickets so on her 2013 The Truth About Love tour.

P!nk will kick off her challenge to beat that record with the Beautiful Trauma tour at the Perth Arena on July 3 and 4.

She then takes her live juggernaut to the Adelaide Entertainment Centre on July 10 and 11, Melbourne’s Rod Lave Arena on July 16, 17, 19 and 20, Sydney’s Qudos Bank Arena on August 3, 4, 6 and 7 and the Brisbane Entertainment Centre on August 14 and 15.

There will be a pre-sale for Telstra customers from October 16, with general sale on October 20, here:
► http://tidd.ly/c0800a7e

Book here your stay in Brisbane:
► http://tidd.ly/3c7d4e9`,`P!NK | Brisbane`,`P!NK | Brisbane`);
this.addEvent(`Bruno Mars | Brisbane`,`Bruno Mars | Brisbane`,`2018-03-14T18:00:00+1000`,`Brisbane Entertainment Centre`,`Bruno Mars brings his 24K Magic tour to Australia in March 2018!

AN Australian tour by Bruno Mars will be 24K Magic. But fans are going to have to wait until March next year for the American pop superstar to drop his supreme talent grenade on our arena stages.

Tickets for the tour, which is scoring rave reviews overseas, go on sale on May 5: 
➤ http://tidd.ly/32372c08
➤ http://tidd.ly/bcfd495d
➤ Book now your Hotel: http://tidd.ly/9b79d2ac

Fans will be pleased to discover he is announcing two shows in Melbourne and Sydney instead of waiting for the expected cyber outrage when tickets sell out in a matter of minutes.

There is a six-day gap between the first concerts in Melbourne and the next one in Brisbane suggesting Mars is either booking a holiday mid tour or will be the superstar attraction at a major event.`,`Bruno Mars | Brisbane`,`Bruno Mars | Brisbane`);
this.addEvent(`The Killers | Brisbane`,`The Killers | Brisbane`,`2018-04-27T20:00:00+1000`,`Brisbane Entertainment Centre`,`The Killers Announce 2018 Australian Tour!

Las Vegas rockers The Killers have come good on their promise, today announcing a 2018 Australian tour in support of their latest album Wonderful Wonderful.

Brandon Flowers and company will embark on their biggest Australasian tour to date in April and May, playing huge all-ages arena shows in Brisbane, Sydney, Perth and Melbourne.

But, before the head down under for a headline tour, the band are scheduled to perform at the AFL Grand Final later this month, while also playing a free show for fans in Melbourne on the big day

Tickets on sale to general public Tuesday, 3rd October:
http://tidd.ly/d797ee7`,`The Killers | Brisbane`,`The Killers | Brisbane`);
this.addEvent(`Foo Fighters | Brisbane`,`Foo Fighters | Brisbane`,`2018-01-25T20:00:00+1000`,`Suncorp Stadium`,`Foo Fighters Announce 2018 Australian Tour With Weezer!

Dave Grohl and company have revealed that they’ll play all-ages arena shows around Australia in January and February next year, in support of their forthcoming ninth album Concrete And Gold. 

Supporting Foo Fighters are all shows will be fellow American rockers Weezer — who are releasing their new album Pacific Daydream on Friday, 27th October — as well as still-to-be-announced local acts in each city.

Tickets on sale Friday, 22nd September, here:
► http://tidd.ly/1c4adf3a`,`Foo Fighters | Brisbane`,`Foo Fighters | Brisbane`);
this.addEvent(`J. Cole | Brisbane, Australia`,`J. Cole | Brisbane, Australia`,`2017-12-02T20:00:00+1000`,`Riverstage`,`J. Cole announces "4 Your Eyez Only" World Tour.

Tickets:
➢ http://tidd.ly/40ed69a8


The 4 Your Eyez Only tour kicks off with a run of small, intimate shows before going into the big arenas in North America. 

The 4 Your Eyez Only Tour follows Cole’s 2015 tour which was the highest-selling hip hop tour of that year, after which Cole embarked on an international festival run in 2016.

This is not the official facebook event`,`J. Cole | Brisbane, Australia`,`J. Cole | Brisbane, Australia`);
this.addEvent(`Lorde in Brisbane`,`Lorde in Brisbane`,`2017-11-23T18:30:00+1000`,`Riverstage`,`Get tickets for Lorde concert in Brisbane, 23 Nov 2017 on ConcertWith.Me - http://cwm.io/89c3d1

All tickets on Concertwith.Me covered by our guarantee.

You will receive a 100% refund for your tickets if:

- Your order was accepted but not delivered by the seller.
- Your order was accepted but not delivered in time for the event.
- Your event is cancelled and is not rescheduled.
- Your tickets were not valid for entry.
- You can purchase your tickets with peace of mind knowing we have you covered.`,`Lorde in Brisbane`,`Lorde in Brisbane`);
this.addEvent(`Lorde • Brisbane • Melodrama World Tour`,`Lorde • Brisbane • Melodrama World Tour`,`2017-11-23T18:00:00+1000`,`Riverstage`,`Frontier Touring (AU & NZ), Eccles Entertainment (NZ) and triple j (AU) are thrilled to confirm an 11-date Melodrama World Tour run for Lorde across the Antipodes this November. 

All eyes are on the meteoric return of one of pop’s most celebrated talents with an all new album, Melodrama, and captivating live show.

The tour begins in Lorde’s home country – New Zealand, where she will play six shows before arriving in Australia for the remaining dates in Perth, Sydney, Brisbane and Melbourne as well as a headline slot at Canberra’s Spilt Milk Festival.

➖

FRONTIER MEMBERS PRE-SALE
Begins: Wed 14 Jun (12noon AEST)
Ends: Thu 15 Jun (12noon AEST)
(or ends earlier if pre-sale allocation exhausted)

Not a member yet? Sign up here: frontiertouring.com/signup

➖

GENERAL PUBLIC ON-SALE
Begins: Mon 19 Jun (12noon AEST)

➖ 

TICKETS FROM
ticketmaster.com.au | Ph: 136 100`,`Lorde • Brisbane • Melodrama World Tour`,`Lorde • Brisbane • Melodrama World Tour`);
this.addEvent(`PINK - Brisbane Entertainment Centre Australia`,`PINK - Brisbane Entertainment Centre Australia`,`2018-08-17T19:00:00+1000`,`Brisbane Entertainment Centre`,`NEW DATE ADDED!

#BeautifulTraumaTour 
Renowned around the world as one of the most dynamic live performers of her generation, Australia’s favourite international pop icon, P!NK, has announced her Beautiful Trauma World Tour will hit Australia and New Zealand in July - September of 2018.

TICKET LINKS:
◈ goo.gl/csscBL
◈ tinyurl.com/Pink-17-August-Brisbane
◈ tinyurl.com/BeautifulTramaTour2018

GENERAL SALE:
Friday 20 October at 11.00am

TICKET LIMITS:
Wild Hearts Zone - 2 per transaction
All other tickets - 4 per transaction

TICKET PRICES:
A Res - $254.55
B Res - $203.60
C Res - $173.05
D Res - $101.75
General Admission - $203.60
* Face value of ticket only - does not include booking + delivery fees`,`PINK - Brisbane Entertainment Centre Australia`,`PINK - Brisbane Entertainment Centre Australia`);
this.addEvent(`2018 Brisbane Global Rugby Tens`,`2018 Brisbane Global Rugby Tens`,`2018-02-09T14:00:00+1000`,`Suncorp Stadium`,`With 300 stars from all the Australian and New Zealand Super sides, plus Pacific heavyweights Fiji and Samoa, Japan’s Panasonic Wild Knights and French powerhouse Pau taking the field, you won't want to miss the 2018 Brisbane Global Rugby Tens.

The ten-a-side format celebrates all aspects the game – fusing the skill and set pieces of 15s with the speed and agility of sevens.

Fast-paced on-field action is matched by the swift ten-minute-half format, which means everything’s to play for in every minute of all 28 men’s games, as well as the hugely popular women’s exhibition matches.

The combination of top-quality rugby and a party vibe means the Tens is for you – whether you’re a die-hard rugby fan, sports lover or you simply enjoy being part of major events.

The tournament itself is the culmination of a week-long festival of activities during which Brisbane becomes the centre of the rugby universe as players, fans and officials from across the globe converge in one place for a whole lot of fun in the sun.

Join the rugby revolution – we can’t wait to see you on Friday 9 and Saturday 10 February 2018 at Suncorp Stadium.`,`2018 Brisbane Global Rugby Tens`,`2018 Brisbane Global Rugby Tens`);
this.addEvent(`Roger Waters | Brisbane`,`Roger Waters | Brisbane`,`2018-02-06T20:00:00+1000`,`Brisbane Entertainment Centre`,`Roger Waters Us + Them tour is coming to Australia and New Zealand in early 2018!

Pink Floyd’s Creative Visionary To Give Fans The Ultimate Concert Experience

Rock icon ROGER WATERS will bring his critically acclaimed US + THEM tour to New Zealand in January 2018, touring here for the first time since his phenomenal The Wall Live broke sales records in 2012.

Currently underway in North America, the tour has garnered rave reviews – hailing as a triumph the “eye-popping” production and the “spectacular” set-list drawn from classics in the Floyd canon and from Waters’ solo work.

Roger Waters’ legendary live performances are renowned as immersive sensory experiences featuring high class, state-of-the-art audio/visual production and breathtaking quad sound. Us + Them is no exception: following months of meticulous planning and visionary craft, it will inspire audiences with its powerful delivery.

Us + Them showcases highlights from Waters’ groundbreaking body of work and features songs from Pink Floyd’s greatest albums - The Dark Side of The Moon, The Wall, Animals, Wish You Were Here - plus new songs from Roger Waters’ album Is This the Life We Really Want? which recently debuted at No. 2 on the RIANZ Album Chart.

The tour title Us + Them is derived from the 1974 track ‘Us And Them’ on the multi-million selling Pink Floyd album The Dark Side of the Moon and has been hailed as the last great Pink Floyd spectacle.

Tickets go onsale on September 08, here: 
► http://tidd.ly/4d1a3bb0`,`Roger Waters | Brisbane`,`Roger Waters | Brisbane`);
this.addEvent(`Paul McCartney | Brisbane`,`Paul McCartney | Brisbane`,`2017-12-09T19:00:00+1000`,`Suncorp Stadium`,`Paul McCartney has announced his first Australia and New Zealand tour dates in almost 25 years.

The legendary singer-songwriter will bring his One On One tour to Perth, Melbourne, Sydney, Brisbane and Auckland between December 2 and 16, marking his first dates in Australia since 1993's The New World tour. Tickets are on general sale at staggered times across the states on July 4.

Get your tickets, here:
http://tidd.ly/381acbf1`,`Paul McCartney | Brisbane`,`Paul McCartney | Brisbane`);
this.addEvent(`Niall Horan | Brisbane`,`Niall Horan | Brisbane`,`2018-06-03T20:00:00+1000`,`Brisbane Entertainment Centre`,`Niall  will bring his Flicker World Tour 2018 to Australia  and New Zealand next June, with arena shows confirmed for Auckland, Brisbane, Sydney and Melbourne.  It is his first solo Arena tour, and will see him perform smash hits ‘Slow Hands’ and ‘This Town’, plus tracks off his forthcoming debut album.

Tickets on sale from 12 noon, Thursday September 14, here:
► http://tidd.ly/fdbfb513`,`Niall Horan | Brisbane`,`Niall Horan | Brisbane`);
this.addEvent(`Triathlon Pink - Brisbane`,`Triathlon Pink - Brisbane`,`2017-10-22T06:00:00+1000`,`Sleeman Sports Complex`,`Have you always wanted to try a triathlon but have been either too scared or too nervous to join in and have a go?  Triathlon Pink is for YOU!!  Not only do we swim in the pool (where you can use a pool noodle if you want to), you can ride ANY kind of (roadworthy) bike and can walk any part of the run (more like a run, walk, chat, run)!  On top of all this… we have the best bunch of ladies around and it’s such a FUN and inspiring morning out!

Triathlon Pink is open and available to children aged 7-13 and ladies of all ages.  For those of you who want bring the whole family and have a spunky male who wants to get involved, we also have Fun Run Pink which is for everyone!

http://triathlonpink.com.au/event/brisbane/`,`Triathlon Pink - Brisbane`,`Triathlon Pink - Brisbane`);
this.addEvent(`Robbie Williams - Brisbane`,`Robbie Williams - Brisbane`,`2018-02-20T20:00:00+1000`,`Brisbane Entertainment Centre`,`Robbie Williams will bring his Heavy Entertainment Show tour to Australia in February.

The singer will kick off the run at Brisbane’s Entertainment Centre on February 20 before heading to Melbourne’s Rod Laver Arena on February 24, Sydney’s Qudos Bank Arena on February 28 and winding up at Perth Arena on March 7. 

Also, in addition to his headline appearance set at the Adelaide 500 on March 4, Williams has added a Day On The Green outdoor concert at the Mt. Duneed Estate in Victoria on March 3.

The former Take That member has spent the majority of 2017 touring behind 'Heavy Entertainment Show', his 11th solo album, which was released last November through Columbia.

Tickets: 
► http://tidd.ly/288fb9a9`,`Robbie Williams - Brisbane`,`Robbie Williams - Brisbane`);
this.addEvent(`Katy Perry | Brisbane`,`Katy Perry | Brisbane`,`2018-08-08T19:00:00+1000`,`Brisbane Entertainment Centre`,`Katy Perry has added Australian shows to her Witness tour.

The pop superstar will play seven shows, including stops in Perth, Adelaide, Melbourne, Brisbane and Sydney between July 24 and August 14, marking her first full tour across the states since her Prismatic world tour in 2014. Tickets are on sale at on July 19.

The tour, which shares its name with the vocalist's latest album, kicks off in North America later this year and also visits the UK and Europe prior to heading down under.

Get your tickets, here:
➢ http://tidd.ly/388d2ab8`,`Katy Perry | Brisbane`,`Katy Perry | Brisbane`);
this.addEvent(`Hamed Homayoun Brisbane`,`Hamed Homayoun Brisbane`,`2017-12-03T20:00:00+1000`,`The Tivoli Brisbane`,`TICKETS WILL BE RELEASED SOON, click "going" on the event to get a notification when tickets are released.
حامد همایون در شهر برزبن برای اولین بار ...
با زدن دکمه .Going در صورت تمایل به شرکت در این کنسرت از اخبار مربوط به این کنسرت و بلیطهای آن به شکل اتوماتیک مطلع شوید`,`Hamed Homayoun Brisbane`,`Hamed Homayoun Brisbane`);
this.addEvent(`Celeste Barber in Brisbane`,`Celeste Barber in Brisbane`,`2017-11-01T20:00:00+1000`,`The Old Museum`,`In this exciting live show, experience the hilarious queen of Instagram, Celeste Barber, as she explains the story behind some of her most famous images, her new relationship with famous people, and the stalkers, fans and comments that get under her skin.`,`Celeste Barber in Brisbane`,`Celeste Barber in Brisbane`);
this.addEvent(`Shawn Mendes | Brisbane, Australia • Entertainment Centre`,`Shawn Mendes | Brisbane, Australia • Entertainment Centre`,`2017-11-29T18:30:00+1000`,`Brisbane Entertainment Centre`,`Shawn Mendes is coming to Brisbane in November!

Tickets: http://tidd.ly/cebaedd5

Frontier Touring are thrilled to confirm that multi-platinum singer songwriter and global sensation Shawn Mendes will bring his acclaimed Illuminate World Tour to Australian and New Zealand arenas this summer!

‘The 18-year-old takes it to a new level on his second album, coming off as a bona fide rock star. His guitar playing has advanced, his songwriting has matured and his vocals are crisp: This kid's the real deal.’ - Associated Press

‘Teen idol is discovered. Teen idol hits it big. Teen idol wants to mature. Teen idol pulls it off.’ - LA Times

The Illuminate World Tour marks Mendes’ much-awaited return to Sydney after his debut shows last November sold out in just minutes, and his first ever performances in Auckland, Brisbane, Melbourne and Perth.  

Shawn is touring in support of his sophomore album Illuminate (Island Records), which debuted at #1 on the Billboard 200 chart, marking his second #1 album debut. Current single ‘Mercy’ has been certified Platinum and has soared to Top 10 on pop radio, and its official video has amassed over 115 million views to date. The Illuminate World Tour follows Shawn’s sold-out 2016 Shawn Mendes World Tour, as well as his sold-out Illuminate release show at New York City’s Madison Square Garden.

The singer/songwriter’s first-ever headlining arena tour now includes over 60 dates across four continents, kicking off April 27th in Europe before going on to North and South America, Australia and Asia.

Tickets: http://tidd.ly/cebaedd5`,`Shawn Mendes | Brisbane, Australia • Entertainment Centre`,`Shawn Mendes | Brisbane, Australia • Entertainment Centre`);
this.addEvent(`PINK - Brisbane Entertainment Centre Australia`,`PINK - Brisbane Entertainment Centre Australia`,`2018-08-15T19:00:00+1000`,`Brisbane Entertainment Centre`,`#BeautifulTraumaTour 
Renowned around the world as one of the most dynamic live performers of her generation, Australia’s favourite international pop icon, P!NK, has announced her Beautiful Trauma World Tour will hit Australia and New Zealand in July - September of 2018.

TICKET LINKS:
◈ goo.gl/csscBL
◈ tinyurl.com/Pink-15-August-Brisbane
◈ tinyurl.com/BeautifulTramaTour2018

PRESALES:
Telstra - Mon 16 October at 11.00am
LN - Wed 18 October at noon

GENERAL SALE:
Friday 20 October at 11.00am

TICKET LIMITS:
Wild Hearts Zone - 2 per transaction
All other tickets - 4 per transaction

TICKET PRICES:
A Res - $254.55
B Res - $203.60
C Res - $173.05
D Res - $101.75
General Admission - $203.60
* Face value of ticket only - does not include booking + delivery fees`,`PINK - Brisbane Entertainment Centre Australia`,`PINK - Brisbane Entertainment Centre Australia`);
this.addEvent(`Queen + Adam Lambert | Brisbane`,`Queen + Adam Lambert | Brisbane`,`2018-02-24T20:00:00+1000`,`Brisbane Entertainment Centre`,`Queen and Adam Lambert are heading back to Australia for the first time since 2014 – and are promising to dig deep into the band's back catalogue beyond the hits. 

The iconic British rock band – or 50 per cent of them at least in Brian May and Roger Taylor – are hitting the road again with American Idol alumnus Adam Lambert, touring the US and Europe this year before reaching Australia in February. 

The band will perform in Sydney, Brisbane, Adelaide, Melbourne and Perth over their two-week tour. 
Tickets go on sale June 23:
http://tidd.ly/cf8f672 

There's hints that the band may centre the tour around their 1977 album News of the World, marking its 40th anniversary. It remains the band's biggest-selling studio album and includes anthems such as We Will Rock You and We Are the Champions.`,`Queen + Adam Lambert | Brisbane`,`Queen + Adam Lambert | Brisbane`);
this.addEvent(`Santa Paws Brisbane`,`Santa Paws Brisbane`,`2017-11-11T09:00:00+1000`,`RSPCA Queensland`,`Santa will be returning to the RSPCA Brisbane Animal Care Campus this November! This is a great opportunity to book in your PAW-fect 2017 Christmas photo with your pooch. Santa Paws is a great way to add a memorable happy snap to your family photo collection while also supporting RSPCA animals in care!`,`Santa Paws Brisbane`,`Santa Paws Brisbane`);
this.addEvent(`Sebastian Bach LIVE Brisbane Australia`,`Sebastian Bach LIVE Brisbane Australia`,`2017-10-26T18:00:00+1000`,`The Tivoli Brisbane`,`Sebastian Bach LIVE Brisbane Australia 2017
Original Voice of Skid Row 
Book / AudioBook #18andLIFEonSkidRow Out Now Down Under !`,`Sebastian Bach LIVE Brisbane Australia`,`Sebastian Bach LIVE Brisbane Australia`);
this.addEvent(`Easy Fever - Brisbane`,`Easy Fever - Brisbane`,`2017-12-16T19:00:00+1000`,`Eatons Hill Hotel`,`A once off Superband - EASYFEVER | EASYBEATS | THE WRIGHTS. Music from The Easybeats and Steve Wright - bands that bought you all the massive hits - Sorry | Friday On My Mind | St Louis | Evie I II III. Superband includes - Australia’s rock n roll royalty:  Chris Cheney, Phil Jamieson, Kram, Tex Perkins & Tim Rogers. 

These shows will also feature the super Easyfever band:  Jak Housden (The Whitlams), Ashley Naylor (Even), Dario Bortolin (Baby Animals), Dave Hibbard (Joe Bonamassa) and Clayton Doley (Divinyls)

Don’t miss out on the musical journey that is Easyfever. 

TICKETS ON SALE NOW via Ticketmaster
Check out www.easyfever.com.au for more info`,`Easy Fever - Brisbane`,`Easy Fever - Brisbane`);
this.addEvent(`Miss Africa Queensland (Brisbane) 2016`,`Miss Africa Queensland (Brisbane) 2016`,`2018-02-25T18:00:00+1000`,`New Globe Theatre`,`This event showcase the talents,beauty,culture of African-Australian young women..

THIS MISS AFRICA INTERSTATE PAGEANT COMPETITION TO QUALIFIER FOR MISS AFRICA AUSTRALIA TITLE (NATIONWIDE) get in to win the crown in your state and for you country and take your nation FLAG to the national level...get in to represent your state and your country.....MISS AFRICA PAGEANT AUSTRALIA

MISS AFRICA BRISBANE (QLD) is to empower young African women in brisbane,Australia and around the world as goodwill ambassadors to serve humanity selflessly and help to empower African communities by furthering the right information on the gains of education and helping to provide access to funds for those willing to attain that dream. Moreso, to break the barriers of inferiority complex and confusion of a distorted and disoriented past of migrant Africans while reinforcing their belief, knowledge, vision and confidence in their biological roots.Also to bring to awareness of all and sundry, the beauty of Africa's diversity and our undying rich culture, heritage, customs and traditions.

MORE INFOR WILL BE UP ASAP..
THANKS`,`Miss Africa Queensland (Brisbane) 2016`,`Miss Africa Queensland (Brisbane) 2016`);
this.addEvent(`Ed Sheeran - Brisbane Suncorp Stadium Australia`,`Ed Sheeran - Brisbane Suncorp Stadium Australia`,`2018-03-20T19:00:00+1000`,`Suncorp Stadium`,`Ed Sheeran announces extra tour dates for his ÷ World Tour. He will tour seven stadium shows across Australia and New Zealand.

Tickets available here: 
❖ tinyurl.com/Ed-Sheeran-20-Mar-Brisbane
❖ goo.gl/csscBL

PRESALE (EXHAUSTED):
Tues 16 May  - 1pm local time
Ticket limit of 4 per purchaser, per show

GENERAL SALE:
Tues 23 May - 2pm local time
Ticket limit of 6 per purchaser, per show

TICKET PRICES:
General Admission (Front Standing) | $166.80
General Admission (Rear Standing) | $105.75
A-Reserved Seating | $166.80
B-Reserved Seating | $105.75
C-Reserved Seating | $75.20`,`Ed Sheeran - Brisbane Suncorp Stadium Australia`,`Ed Sheeran - Brisbane Suncorp Stadium Australia`);
this.addEvent(`John Edward - Brisbane, QLD Australia`,`John Edward - Brisbane, QLD Australia`,`2017-11-11T12:00:00+1000`,`Sleeman Sports Complex`,`Crossing Over With John Edward live in Brisbane, Queensland, Australia!

This is your chance to be part of a live group audience to watch John Edward connect with the other side. There will be question and answer sessions and messages from the other side. Is someone waiting to talk to you?

Tickets Available At Ticketmaster Australia:
http://www.ticketmaster.com.au/psychic-medium-john-edward-chandler-queensland-11-11-2017/event/130052A58CDE3094?artistid=803926&majorcatid=10005&minorcatid=104

Sleeman Sports Complex 
Chandler Theatre
Old Cleveland Rd & Tilley Rd
Chandler QLD 4155

Event 12:00pm-2:00pm

This event is a reserved seating event! 
No audio, video or photography allowed. 
No alcohol allowed inside event.

VIP Tickets now available!

The VIP Evolve tickets are good for entry into the event and:
A one year membership to Evolve (a $99 value) 
A special 20 minute after event called "Just Five More" that is a conversation, question and answer session with John and the other VIP ticket holders.
The opportunity to meet and take a photo with John at the end of the event.
A welcome package with a book, exclusive Evolve member items and more!`,`John Edward - Brisbane, QLD Australia`,`John Edward - Brisbane, QLD Australia`);
this.addEvent(`One Day Sundays - Brisbane - Sun 29 October`,`One Day Sundays - Brisbane - Sun 29 October`,`2017-10-29T13:00:00+1000`,`The Victory Hotel`,`Australia’s favourite hip hop day party ONE DAY SUNDAYS is coming back to Brisbane on Sunday 29 October at the Victory Hotel!

One Day Sundays is a day party combining DJs, dancing, live graffiti, delicious food and drinks in an outdoor setting, curated by Sydney hip hop collective One Day. Since they began in Sydney four years ago, One Day Sundays parties have struck a chord with partygoers across Australia, making it the only touring hip hop party in the country. 

Held the same after the massive Sprung Festival, DJs Joyride and Nick Lupi (Spit Syndicate) will be holding it down for the One Day DJs. Local legends Finehouse, DZYR, Sullivan, Charlie Hustle,  Versace Tour Guide and Phil Fabros will be adding some Brissy flavour!

Our own JIMMY NICE will be painting a mural on the day, too!

What better way to welcome the warmer months than a Sunday session at the Victory Hotel hosted by the One  Dayers? 

Entry is FREE and the party kicks off at 1pm - see you there!

Brisbane One Day Sundays
Sun 29 October 
The Victory Hotel, 127 Edward St, Brisbane City
Free Entry. 1pm - 9pm!`,`One Day Sundays - Brisbane - Sun 29 October`,`One Day Sundays - Brisbane - Sun 29 October`);
this.addEvent(`Ed Sheeran | Brisbane (additional show)`,`Ed Sheeran | Brisbane (additional show)`,`2018-03-21T19:00:00+1000`,`Suncorp Stadium`,`Ed Sheeran will bring his ÷ world tour to stadiums across Australia and New Zealand next March!

The tour, which has already weaved its way through Europe and the UK, will head down under for stadium shows in Perth, Adelaide, Melbourne, Sydney, Brisbane, Auckland and Dunedin between March 3 and 29.

Opening acts will be announced at a later stage, while tickets are on general sale at staggered times across the states on May 23.

The tour shares its name with the singer-songwriter's third album, ‘÷’, which was released earlier this year.

Tickets go onsale at May 23, here: http://tidd.ly/727c2b4d`,`Ed Sheeran | Brisbane (additional show)`,`Ed Sheeran | Brisbane (additional show)`);
this.addEvent(`PACES Creepin Tour Brisbane`,`PACES Creepin Tour Brisbane`,`2017-11-10T20:30:00+1000`,`Woolly Mammoth`,`PACES ~ CREEPIN TOUR ~ BRISBANE
Friday 10th November ~ On sale now 
http://www.moshtix.com.au/v2/event/paces-creepin-tour/98520

Supported by Feki & Muki
Guest vocalist Woodes & visuals by Ego

With his signature sunshine vibes all over current single ‘Creepin’, today Paces announces a national tour which will see crowds around the country join in on the infectious fun of his live show. Melbourne producer singer-songwriter Woodes will be joining the ‘Creepin’ tour as a guest singer, with Brisbane producer Feki and Sydney purveyor of pop MUKI on board as the main supports. The tour will take in a slot at This That festival ahead sending out the year with a bang at the inaugural NYE in the Park festival in Sydney.

Released earlier in 2017, previous single ‘Savage’ (feat. Nyne) is sitting at almost 7 million Spotify streams, spurred a sold-out national tour, and saw support slots with Marshmello and Illy.

2016 was a year to remember for Gold Coast Producer Paces, his debut album Vacation landed in the iTunes Top 20 Album charts and hit #2 on the iTunes Electronic charts. Playing numerous festivals and selling out venues on his national capital city tour and regional tour, he catapulted to viral status when he performed on triple j’s Like A Version with Guy Sebastian. 

CREEPIN TOUR DATES
Tickets: pacesmusic.com

Fri 13 Oct / Oxford Art Factory, Sydney
Sat 14 Oct / Fat Controller, Adelaide
Thur 19 Oct / Uni Bar, Wollongong
Fri 20 Oct / Academy, Canberra
Sat 21 Oct / Jack Rabbit Slims, Perth
Sun 29 Oct / Beach Hotel, Byron Bay
Fri 3 Nov / Corner Hotel, Melbourne
Sat 4 Nov / This That Festival, Newcastle, NSW
Fri 10 Nov / Woolly Mammoth, Brisbane
Sat 11 Nov / Elsewhere, Gold Coast`,`PACES Creepin Tour Brisbane`,`PACES Creepin Tour Brisbane`);
this.addEvent(`Suncorp Stadium, Brisbane`,`Suncorp Stadium, Brisbane`,`2017-12-09T17:00:00+1000`,`Suncorp Stadium`,`Suncorp Stadium, 
40 Castlemaine St,
Milton QLD 4064,
Australia`,`Suncorp Stadium, Brisbane`,`Suncorp Stadium, Brisbane`);
this.addEvent(`PINK - Brisbane Entertainment Centre Australia`,`PINK - Brisbane Entertainment Centre Australia`,`2018-08-18T19:00:00+1000`,`Brisbane Entertainment Centre`,`NEW DATE ADDED!

#BeautifulTraumaTour 
Renowned around the world as one of the most dynamic live performers of her generation, Australia’s favourite international pop icon, P!NK, has announced her Beautiful Trauma World Tour will hit Australia and New Zealand in July - September of 2018.

TICKET LINKS:
◈ goo.gl/csscBL
◈ tinyurl.com/Pink-18-August-Brisbane
◈ tinyurl.com/BeautifulTramaTour2018

GENERAL SALE:
Friday 20 October at 11.00am

TICKET LIMITS:
Wild Hearts Zone - 2 per transaction
All other tickets - 4 per transaction

TICKET PRICES:
A Res - $254.55
B Res - $203.60
C Res - $173.05
D Res - $101.75
General Admission - $203.60
* Face value of ticket only - does not include booking + delivery fees`,`PINK - Brisbane Entertainment Centre Australia`,`PINK - Brisbane Entertainment Centre Australia`);
this.addEvent(`Sad Grrrls Fest Brisbane 2017`,`Sad Grrrls Fest Brisbane 2017`,`2017-11-04T12:00:00+1000`,`Black Bear Lodge`,`Sad Grrrls Club Presents
In partnership with Young Henrys
SAD GRRRLS FEST BRISBANE 2017
Saturday November 4th
NEW VENUE: BLACK BEAR LODGE BRISBANE (18+)
Midday-Midnight

Major Leagues
Nakatomi
Moaning Lisa
Huntly
Rachel Maria Cox*
Antonia & The Lazy Susans

JUST ADDED: Morning TV (SYD)
Being Jane Lane
Average Art Club
FeelsClub
The Delicates
Sleep Club
Laura Mardon Music
Emmy Hour Music
Cloud Tangle

*Rachel Maria Cox appearing solo in Brisbane only

Sad Grrrls Festival, Australia’s Largest music festival dedicated to promoting gender diversity in the music industry, is back for its third year running. Presented by DIY record label and booking agency Sad Grrrls Club, the festival, which last year sold out Melbourne’s Reverence Hotel and packed out Sydney’s Factory Theatre, has added a Brisbane leg to the event!

Perhaps the most significant change is the announcement of acts headlining all three dates of the festival. Headed up by Major Leagues and Nakatomi, organisers have already announced that Canberra’s Moaning Lisa, Melbourne’s Huntly, Newcastle’s Rachel Maria Cox (also the person behind Sad Grrrls Club) and labelmates Antonia & The Lazy Susans will be playing alongside stacked local line ups in each city.

Last year, Beat Magazine called it “the greatest event I’ve ever attended” and event organiser/label manager/performer Rachel Maria Cox says ‘This year there’s been a bit of a wait on the line up announcement, but I’m confident it has paid off. I’m incredibly stoked with the changes we’ve made and the line up we’ve put together and I hope everyone else will be too.”

Sad Grrrls Club Safer Spaces Invitation:
ALL SAD GRRRLS CLUB EVENTS ARE SAFER SPACES

Acknowledgement of Country
We acknowledge that this event takes place on occupied Aboriginal land of the Turrbal People of the Meanjin Nation, and we acknowledge that sovereignty was never ceded. We pay our respects to the Indigenous Elders past, present and future.

What is a Safer Space?
According to the Coalition for Safer Spaces, “a safer space is a supportive, non-threatening environment that encourages open-mindedness, respect, a willingness to learn from others, as well as physical and mental safety. It is a space that is critical of the power structures that affect our everyday lives, and where power dynamics, backgrounds, and the effects of our behavior on others are prioritized. It’s a space that strives to respect and understand survivors’ specific needs. Everyone who enters a safer space has a responsibility to uphold the values of the space.”

A Safer Spaces Invitation is not perfect from the beginning and is an ever-evolving document that highlights issues as they come to the surface therefore requires constant revision. The term “safer” is used because it is understood that every individual’s perception of safety is different and no space can be entirely safe for every single individual. However, a safer spaces invitation operates on trust and we hope that we will all be aware of our own actions to ensure the safety of others and will be held accountable when we jeopardise the wellbeing of ourselves and others.

What does this mean?
As individuals, we are all responsible for our own actions and their consequences. There is zero tolerance for abusive, violent and hateful behaviour. Please be mindful of your own words and actions.

Sad Grrrls Club events strive to be free of:
-Homophobia, Transphobia, Racism, Sexism, Ableism, Discrimination & Hate Speech
-Bullying & put downs
-Illegal/inappropriate behaviour
-The usage of illicit substances on our premises and excessive intoxication on our premises
-Kicking or throwing of objects
-Abusive/threatening behaviour including verbal & physical violence

We Ask That You:
-Assess the way in which you dominate spaces; ask yourself “does my behaviour make people around me feel uncomfortable or threatened?”
-Don’t touch people without asking for their consent first
-Ask about peoples’ preferred pronouns. Sad Grrrls Fest is a gender diverse initiative therefore the way we address people can really affect them – use “they”and “their” as pronouns if you’re unsure. Don’t assume that a person adheres to the he/she binary.

What happens when someone violates the Safer Spaces Invitation?
On first instance, a staff member will issue that person with a reminder. If their behaviour continues, there will be a mediation meeting held to discuss their behaviour and how they may be helped with changing those behaviours. This meeting may be held with the organisers and venues. However, if a breach is ongoing or severe, the organisers and venue can issue people with a ban. We would like to resolve conflicts internally before having to call upon any law enforcement. Law enforcement should always be a last resort.

If you feel unsafe:
Sad Grrrls Fest Safer Spaces officers will be indicated by lanyards and wristbands. Please come and see one of these people if you require help at any point. If you would prefer to remain anonymous you can text a phone number that will be provided closer to the event date.

Outside Hotlines:
Beyond Blue: 1300 22 4636
Advice and support for anxiety and depression
Lifeline: 13 11 14
Life Crisis Support
NSW Rape Crisis: 1800 424 017
Counselling service for sexual assault
QLife: 1800 1845 27
www.qlife.org.au
LGBTIQ Counselling and referral service

Accessibility: 
Accessibility - There is wheelchair accessibility to the area in front of the stage and to the outdoor bar, but unfortunately there is not accessibility to the bathrooms. Fortunately there are wheelchair-friendly bathrooms located in the nearby mall.

Bathrooms - The Brightside will ensure that the bathrooms are not gender specific on the day by updating the current signage.

Scent sensitivities - The space is not 100% scent-free. There is no smoking allowed indoors or in the outdoor bar area except for an allocated smoking space. The allocated smokers area is located at the front of the outdoor area of the venue, to the left as you enter the front gates.`,`Sad Grrrls Fest Brisbane 2017`,`Sad Grrrls Fest Brisbane 2017`);
this.addEvent(`Ed Sheeran - Brisbane Suncorp Stadium Australia`,`Ed Sheeran - Brisbane Suncorp Stadium Australia`,`2018-03-21T19:00:00+1000`,`Suncorp Stadium`,`** NEW DATE**

Ed Sheeran announces extra tour dates for his ÷ World Tour. He will tour seven stadium shows across Australia and New Zealand.

Tickets available here: 
❖ tinyurl.com/Ed-Sheeran-21-Mar-Brisbane
❖ goo.gl/csscBL

GENERAL SALE:
Tues 23 May - 2pm local time

TICKET PRICES:
General Admission (Front Standing) | $166.80
General Admission (Rear Standing) | $105.75
A-Reserved Seating | $166.80
B-Reserved Seating | $105.75
C-Reserved Seating | $75.20
* TICKET LIMIT = 6`,`Ed Sheeran - Brisbane Suncorp Stadium Australia`,`Ed Sheeran - Brisbane Suncorp Stadium Australia`);
this.addEvent(`Lana Del Rey | Brisbane`,`Lana Del Rey | Brisbane`,`2018-03-29T20:00:00+1000`,`Brisbane, QLD`,`Lana Del Rey Announces 2018 Australian Tour Dates!

Lana Del Rey has just announced her first set of Australian tour dates since 2012.

Our favourite Sad Girl has finally followed through on her promise and dropped a bouquet of beautiful tour dates into our laps for between March and April 2018.

Armed with her new album Lust For Life (but also Ultraviolence and Honeymoon, because she hasn’t visited us since dropping those either!) the retro-pop songstress will perform shows in Brisbane, Melbourne and Sydney.

Tickets:
http://tidd.ly/263569c9`,`Lana Del Rey | Brisbane`,`Lana Del Rey | Brisbane`);
this.addEvent(`Harry Styles • Brisbane • Live On Tour`,`Harry Styles • Brisbane • Live On Tour`,`2018-04-28T18:00:00+1000`,`Brisbane Entertainment Centre`,`Frontier Touring are delighted to announce that Harry Styles will return to Australia next year, performing in arenas across the country in April 2018.  

Styles’ debut Australian theatre shows sold out in less than a minute so do not miss this second chance to see this master of both the charts and live stage when he returns to Australia next April. 

➖

FRONTIER MEMBERS PRE-SALE
Begins: Tue 13 Jun (4pm AEST)
Ends: Wed 14 Jun (4pm AEST)
(or ends earlier if pre-sale allocation exhausted)

Not a member yet? Sign up here: frontiertouring.com/signup

➖

GENERAL PUBLIC ON-SALE
Begins: Thu 15 Jun (4pm AEST)

➖ 

TICKETS FROM
ticketek.com.au | Ph: 132 849`,`Harry Styles • Brisbane • Live On Tour`,`Harry Styles • Brisbane • Live On Tour`);
this.addEvent(`The Chainsmokers in Brisbane`,`The Chainsmokers in Brisbane`,`2017-10-22T17:00:00+1000`,`Riverstage`,`Get tickets for The Chainsmokers concert in Brisbane, 22 Oct 2017 on ConcertWith.Me - http://cwm.io/8f549a

All tickets on Concertwith.Me covered by our guarantee.

You will receive a 100% refund for your tickets if:

- Your order was accepted but not delivered by the seller.
- Your order was accepted but not delivered in time for the event.
- Your event is cancelled and is not rescheduled.
- Your tickets were not valid for entry.
- You can purchase your tickets with peace of mind knowing we have you covered.`,`The Chainsmokers in Brisbane`,`The Chainsmokers in Brisbane`);
this.addEvent(`Good Food & Wine Show Brisbane 2017`,`Good Food & Wine Show Brisbane 2017`,`2017-10-27T09:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`Enjoy a fun day out with friends discovering new foods, new wines and latest products. With hundreds of local and international exhibitors, your new favourite food and drinks are only a sample away at the Good Food & Wine Show Brisbane, presented by Citi.

With loads of new features & classes available, the return of old favourites, and an action packed celebrity chef line-up the show is not to be missed!`,`Good Food & Wine Show Brisbane 2017`,`Good Food & Wine Show Brisbane 2017`);
this.addEvent(`Winston Surfshirt | Brisbane - Sponge Cake Tour - SOLD OUT`,`Winston Surfshirt | Brisbane - Sponge Cake Tour - SOLD OUT`,`2017-11-11T20:00:00+1000`,`Woolly Mammoth`,`ASTRAL PEOPLE, Sweat It Out, Niche Productions & triple j present...
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Winston Surfshirt - Spounge Cake Australian Tour
with special guests Polographia & Crooked Letter

Sat 11th November | Woolly Mammoth, Brisbane
Tickets → SOLD OUT

Sun 12th November | Woolly Mammoth, Brisbane
Tickets → SOLD OUT

Listen to our Debut Album 'Sponge Cake' → https://sweatitout.lnk.to/spongecakeFa
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
One of this year’s brightest acts is Sydney six-piece Winston Surfshirt, who today share their new single “Same Same” out via Sweat It Out. Accompanying the single arrives news of their debut album titled Sponge Cake set for release September 29, celebrated with a national headline tour. 
 
“Same Same” is armed with a throbbing bass line, catchy chorus and vibrant jazz-infused interludes. The multi-layered track is only to be complemented perfectly by Winston’s signature vocals. 
 
''This was one of the last songs written for Sponge Cake, It started in a different pitch and was much slower, I think through almost playing it live a couple days after it was written for about a year helped to form it into the party that it is now. We called in some extra brass and percussion which really helped create it in to the song you're hearing today.'' – Winston.
 
Following on from their breakout single “Be About You” and follow up “Ali D”, “Same Same” arrives with the news of their highly anticipated debut album titled Sponge Cake, set for release on Friday September 29. To celebrate, the boys will embark on a national headline tour (their second of the year), hitting all major cities, with support from frequent collaborators Polographia and local legend Crooked Letter. Kicking off in at Sydney's Metro Theatre on November 10 and ending at Adelaide's Fat Controller on Saturday December 2 – if it’s anything like their sold out debut tour, you’ll want to get a ticket fast.
 
Hailing from Sydney’s Northern Beaches, Winston Surfshirt have developed a cult following with their smooth style and raucous live shows. The band are set to continue their golden run of form having already garnered support from the likes of Elton John (on his Beats 1 show), Zane Lowe (who branded them as one of his breaking acts of 2017) and BBC Radio 1’s Huw Stephens. Locally, triple j have shown their full support with both "Be About You" and "Ali D" added to full rotation upon release. The band showed their appreciation last week as they hosted triple j's Like A Version, bringing it home with their killer rendition of 50 Cent & Nate Dogg's classic "21 Questions". 
 
Their recent performance at Splendour In The Grass was nothing short of spectacular and a clear standout of the weekend. While they may have opened the Mix Up Stage, their crowd was reflective of a headliner, with adoring fans filling up the tent to see a blaring performance from the band, setting the festival standard for the artists that followed. 
 
Winston Surfshirt are fast becoming one of Australia’s most prolific acts - delve into "Same Same" & prepare for their forthcoming full-length album, out this September.
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Tickets → http://bit.ly/WinstonSCBris`,`Winston Surfshirt | Brisbane - Sponge Cake Tour - SOLD OUT`,`Winston Surfshirt | Brisbane - Sponge Cake Tour - SOLD OUT`);
this.addEvent(`Polaris ‘The Remedy’ Aus Tour – Brisbane 18+ *SOLD OUT*`,`Polaris ‘The Remedy’ Aus Tour – Brisbane 18+ *SOLD OUT*`,`2017-10-27T20:00:00+1000`,`The Brightside`,`Destroy All Lines & Resist Present: 

Polaris
‘The Remedy’ Australian Tour
with special guests 
Belle Haven
Deadlights & Daybreak 

Friday, 27th October
The Brightside, Brisbane 18+ 
8:00 PM

Tickets on-sale now for $19.90 inc Booking Fee
SOLD OUT`,`Polaris ‘The Remedy’ Aus Tour – Brisbane 18+ *SOLD OUT*`,`Polaris ‘The Remedy’ Aus Tour – Brisbane 18+ *SOLD OUT*`);
this.addEvent(`Freewyo - Live at Brisbane`,`Freewyo - Live at Brisbane`,`2017-11-11T19:00:00+1000`,`Black Bear Lodge`,`After recently touring Australia on a sold out tour with YG
and co-headlining Rhythm & Rhyme, Australia's hottest music festival.
Freewyo has now linked up with AfroKing, Juwan, MAARV, Kasha J, Cic Caribbean and islands crew ent. & Jamrock: Australian Tour to bring the new generation of sound to Brisbane city.

Tickets are now on sale here ---> https://goo.gl/Tcvwhm`,`Freewyo - Live at Brisbane`,`Freewyo - Live at Brisbane`);
this.addEvent(`Jack Johnson in Brisbane`,`Jack Johnson in Brisbane`,`2017-12-03T18:00:00+1000`,`Riverstage`,`Get tickets for Jack Johnson concert in Brisbane, 3 Dec 2017 on ConcertWith.Me - http://cwm.io/933216

A spare ticket left? List it for sale on our marketplace https://goo.gl/dbCuQw safe, free and fast!

All tickets on Concertwith.Me are covered by our guarantee.

You will receive a 100% refund for your tickets if:

- Your order was accepted but not delivered in time for the event.
- Your event was cancelled and is not rescheduled.
- Your tickets were not valid for entry.
- You can purchase your tickets with peace of mind knowing we have you covered.`,`Jack Johnson in Brisbane`,`Jack Johnson in Brisbane`);
this.addEvent(`The National - Riverstage, Brisbane`,`The National - Riverstage, Brisbane`,`2018-02-27T20:00:00+1000`,`Riverstage - 59 Gardens Point Rd, Brisbane City`,`THE NATIONAL
RIVERSTAGE
TUESDAY 27TH FEBRUARY
TICKETS → http://bit.ly/2eIuc0O

The National’s Australian tour will follow the release of their seventh LP, Sleep Well Beast. On top of a wealth of unforgettable music spanning six critically acclaimed records, this will mark the first time Australian audiences will hear live performances from Sleep Well Beast – hosted at premiere venues made to showcase one of the most formidable and impeccable live acts in the world.

Sleep Well Beast was produced by band member Aaron Dessner with co-production by Bryce Dessner and Matt Berninger.  The album was mixed by Peter Katis and recorded at Aaron Dessner’s Hudson Valley, New York studio, Long Pond.`,`The National - Riverstage, Brisbane`,`The National - Riverstage, Brisbane`);
this.addEvent(`Dog Lovers Show - Brisbane 2017`,`Dog Lovers Show - Brisbane 2017`,`2017-11-04T09:30:00+1000`,`Royal International Convention Centre`,`Visit the Brisbane Dog Lovers Show website Home Page (dogloversshow.com.au/brisbane) for more details or view the show highlights below.

See below for general information on the Show and answers to some of our ‘Frequently Asked Questions’.


[About the Show]

Our Dogs are family and love us unconditionally. So if you love them as much as we do then join us to celebrate, connect and learn more about our Best Friends at one of the largest festivals in the world dedicated to Dogs. We think it's the happiest place on Earth!

The Brisbane Dog Lovers Show will be the happiest place on Earth this 4 and 5 November! The multi award-winning festival returns even bigger and better in 2017 with a huge array of canine-based entertainment, education and information that is heaven for Dog lovers!


[Here’s just a few highlights]

The Royal Canin Arena will be buzzing with action and energy with all the exciting new shows coming along. As always, the KONG Celebrity Vet Stage will provide expert tips for a healthier, happier Dog with talks from some of the most trusted celebrity vets and experts in the country. Joining us for these two must-see features include Dr Chris Brown, Dr Katrina with Kelly Gill and the Wonderdogs, our Hero Dog Ambassador and Neighbours star Andrew Morley plus Hollywood animal trainer Peta Clarke!

A new feature to the show, Insta-Pooch will bring a bit of Hollywood glamour to the event as some of Brisbane's most famous Dogs on Instagram are interviewed by the media then walk the red carpet to interact with their loyal fans!

Discover an incredible Breed Showcase, providing visitors with a unique opportunity to meet and learn more about a wide array of canines of all shapes, sizes and personalities. The Perfect Match feature sponsored by Bow Wow will also help visitors find the most suitable Dog breeds for them and their lifestyle with a wide range of information posters and a Breed Selector questionnaire. The Australian Military Dog Tribute also returns to our shows to acknowledges the incredible contribution these Dogs have made in war.

Connecting with Dogs is a smile-inducing, endorphin-releasing activity for kids and adults alike, so don’t miss the Rescue Dog Zone and Pat-A-Pooch area for education on Dog adoption and a serious cuddle-fix!.

You can also see, compare & buy hundreds of the latest & greatest Doggy products & services under hundreds of Exhibitors, New Product launches and exclusive Show Specials to save you money! There’s also free Doggy Face Painting, an Ask-A-Vet Zone offering free vet advice from Greencross experts and some of Brisbane's best food trucks for those looking to fuel up for a pooch-packed weekend!

It’s the ultimate day out for Dog Lovers of all ages and a once a year opportunity to celebrate the companionship, unconditional love and joy that our furry friends bring to our lives every day. And don’t forget to enter the Ultimate Doggy Door Prize at the show to go into the draw to WIN amazing prizes for you and your Pooch! We hope to see you there.


[Frequently Asked Questions]

What are the Show opening times?
9.30am to 5pm each day

Where is the venue?
Just 1.6kms from the CBD, the Royal ICC is located at the Brisbane Showgrounds which is bordered by Bowen Bridge Road, O’Connell Terrace, St Paul’s Terrace and Gregory Terrace at Bowen Hills.

Can I bring my Dog to the show?
We love ALL dogs but this event is all about educating, entertaining and informing Dog owners (not dogs) so visitors are unable to bring their Dog. But there will be hundreds of beautiful K9’s at the show for you to meet and connect with. Dog and human welfare is our number one priority so this policy is to protect the safety of all. Click here to view the reasons behind this important policy. By purchasing a ticket you agree to abide by the Dog Safety & Welfare plans which can be viewed here.

Where can I park?
We are putting together a list of nearby car parks, visit the website for more details.

What are the public transport options?
If you can, we recommend you also take advantage of the many public transport options and for this information including parking locations, prices and options please visit our website.

Can I come on any day with my ticket?
No, you must select either a Saturday or Sunday entry ticket at the point of purchase.

What ticket categories are available?
We offer Adult, Child, Pensioner and Family tickets but not Student or Senior tickets.

Are Assistance Dogs able to enter the Show/Venue?
Yes, visitors with accredited Assistance Dogs are able to bring their dogs into the Show however they will need to show verification at the door.

Do you accept Companion Cards?
We accept accredited Companion Cards for carers who do not need to pay for a ticket upon presentation of their card, but the person in their care will still need to purchase a ticket. Please note that Seniors discount is not available.

Are there ATM’s in the venue and will Exhibitors accept credit cards and EFTPOS?
An ATM machine is located within the venue. Many exhibitors will also offer EFT and credit card payment. So it’s a great place to stock up on all the gear you need for your pooch for the next 12 months!

Are there any additional costs once I’m inside the show?
All the entertainment, education, information and attractions are free upon entry so it’s a great value day out! Even the face-painting is free! So you just need to cover your food & drinks and we have lots of Brisbane’s best Food Trucks at the event with a wide variety of yummy grub!

Can I buy products & services for my Dog at the Show and will there be any new products or show specials available?
Absolutely! It’s like a huge Doggy Supermarket (for Dog owners!) with hundreds of Exhibitors selling and launching an extensive range of fantastic New Products and Services with Show Specials and great offers exclusive to Dog Lovers visitors. So bring your wallet as you can see, compare and buy all the latest and greatest toys, treats, accessories, food, insurance and services to reward your Pooch when you get home!

Can we purchase a Dog at the show?
We are governed by the Queensland Domestic Animals Act, which states that under no circumstances are we permitted to have any dog adopted and/or sold at the event. However all the information will be on hand to ensure you are very well informed on all the best options.


[Note]

Tickets are only valid for the day they are purchased so additional tickets are required for multi-day visits. Tickets are non-transferable once purchased. Tickets are under a no refund policy and will only be refunded if there has been a technical error (such as a duplicate purchase) and the refund is requested within a fortnight after the show.`,`Dog Lovers Show - Brisbane 2017`,`Dog Lovers Show - Brisbane 2017`);
this.addEvent(`Kathmandu Clean-Up Event - Brisbane`,`Kathmandu Clean-Up Event - Brisbane`,`2017-11-04T13:00:00+1000`,`Brisbane City Botanic Gardens`,`Help keep plastic and debris out of our oceans and waterways and sign up to our conservation event in Brisbane!

Join us on November 4, 1-3pm to clean up Brisbane's waterways. The rubbish will be categorised and the data loaded into the Australian Marine Debris Initative database, allowing the Tangaroa Blue Foundation to create 'source reduction plans' for local communities to address the cause of marine debris at the source, and limit the amount of rubbish created in the first place. 

We'll meet at the Riverstage in the City Botanic Gardens, next to City Cycle station No. 20. Exact Google Maps location here: https://goo.gl/maps/Hohfbf16Wvp

Please click 'find tickets' at the top to sign up, or visit this link: https://kathmandu.typeform.com/to/wzyTfh

Tangaroa Blue will be on hand to brief the group about plastics, keeping our waterways clean and safety. Keep your ears on alert as there will be a quiz at the end with some sweet Kathmandu prizes!

See you there!`,`Kathmandu Clean-Up Event - Brisbane`,`Kathmandu Clean-Up Event - Brisbane`);
this.addEvent(`Oxfam Trailwalker Brisbane 2018`,`Oxfam Trailwalker Brisbane 2018`,`2018-06-22T07:00:00+1000`,`D'Aguilar National Park`,`Register for the 100km here - http://bit.ly/OTWB100km 

Register for the 55km here - http://bit.ly/OTWB55km 

#OxfamTrailwalker is an epic team adventure.

Oxfam Trailwalker Brisbane, 22-24 June 2018, sees teams walking 100km or 55km through the beautiful D’Aguilar National Park.

Invite your friends to join you in the challenge, or use this space to find your team of 4. We'll be here to answer your questions and to keep you posted on upcoming Brisbane news.  

Be sure to check out our Facebook page at www.facebook.com/OxfamTrailwalkerAustralia.`,`Oxfam Trailwalker Brisbane 2018`,`Oxfam Trailwalker Brisbane 2018`);
this.addEvent(`Mallrat Better Tour - Brisbane`,`Mallrat Better Tour - Brisbane`,`2017-12-07T19:00:00+1000`,`Black Bear Lodge`,`18+`,`Mallrat Better Tour - Brisbane`,`Mallrat Better Tour - Brisbane`);
this.addEvent(`Ed Sheeran • Brisbane • ÷ World Tour`,`Ed Sheeran • Brisbane • ÷ World Tour`,`2018-03-20T18:00:00+1000`,`Suncorp Stadium`,`Frontier Touring are delighted to welcome Ed Sheeran, one of the biggest names in music, back to his adopted home for seven stadium shows across Australia and New Zealand next March as part of his ÷ World Tour.

➗

SUNCORP STADIUM, BRISBANE
Tuesday 20 March - SOLD OUT!
Wednesday 21 March - SOLD OUT!

➗ 

TICKETING INFORMATION
All tickets will be held back for delivery until Tue 30 Jan 2018

General Admission tickets are recommended for patrons aged 10 years and over.

➗

ACCESSIBILITY TICKETING INFORMATION
Wheelchair seating, companion card and accessibility ticketing details: http://frntr.co/Ed18Accessibility

➗

TICKETS FROM
ticketek.com.au | Ph: 132 849`,`Ed Sheeran • Brisbane • ÷ World Tour`,`Ed Sheeran • Brisbane • ÷ World Tour`);
this.addEvent(`J. Cole in Brisbane City`,`J. Cole in Brisbane City`,`2017-12-02T18:00:00+1000`,`Riverstage Brisbane`,`Get tickets for J. Cole concert in Brisbane City, 2 Dec 2017 on ConcertWith.Me - http://cwm.io/80f53c

All tickets on Concertwith.Me covered by our guarantee.

You will receive a 100% refund for your tickets if:

- Your order was accepted but not delivered by the seller.
- Your order was accepted but not delivered in time for the event.
- Your event is cancelled and is not rescheduled.
- Your tickets were not valid for entry.
- You can purchase your tickets with peace of mind knowing we have you covered.`,`J. Cole in Brisbane City`,`J. Cole in Brisbane City`);
this.addEvent(`Wilderness Survival Camp – Brisbane`,`Wilderness Survival Camp – Brisbane`,`2017-11-04T08:00:00+1000`,`Mt Barney Lodge`,`This Wilderness Survival Camp aims to prepare participants to adequately survive in the Australian Bush both in emergencies and in their everyday weekend adventures. It includes instruction in survival, a survival kit, as well as plenty of practise of all the skills.

We will be looking at all the different ways of gathering food and the best options in the region so bring your sense of adventure and an open mind.

ROUGH ITINERARY

Saturday morning we run through the theory behind survival introducing ‘The Big 5,’ before moving onto equipment and ‘The Rule of 3.’ En route to our destination, we’ll touch on bush navigation and bush tucker and once we arrive, we’ll set up our shelter for the night utilising natural materials and run through the priorities for the rest of the day.

Sunday will see us building our knife skills, how to make basic camp tools, basic traps and hunting tools, tracking skills, water and hygiene as well as fire craft.

Food over the weekend will be sufficient for survival with extras provided by foraging.

INCLUSIONS

Survival Kit – Includes survival tarp, mat, water bottle, ferro rod, reflector, rope plus a heap of bits and bobs that are super useful in a survival situation.

Food – Enough food will be provided to maintain strength but definitely we will be looking to forage for food along the way

Camping and first aid and public liability

MORE INFO AND TO BUY TICKETS
https://weareexplorers.co/product/4-5-nov-wilderness-survival-course-brisbane/

EMAIL ENQUIRIES
ellie@weareexplorers.com.au`,`Wilderness Survival Camp – Brisbane`,`Wilderness Survival Camp – Brisbane`);
this.addEvent(`Boys, Boys, Boys (Brisbane) with Maggie Dent`,`Boys, Boys, Boys (Brisbane) with Maggie Dent`,`2017-11-15T19:00:00+1100`,`St Paul's School, 34 Strathpine Rd, Bald Hills`,`If you are raising or educating boys from birth through adolescence, this seminar is not to be missed. 

Back by popular demand, parenting author and educator Maggie Dent returns to Brisbane with this insightful, practical event for anyone who lives or works with boys. 

THE SEMINAR -- BOYS, BOYS, BOYS: UNDERSTANDING, NURTURING & CONNECTING WITH TODAY'S BOYS

"Queen of common sense” Maggie Dent will share her insights, practical suggestions and passion for raising boys in our chaotic world. 

Statistically, boys are still at greater risk than girls of injury, death, school failure, cancer ... the list goes on. 

From before school to adulthood, the journey of a boy to a man is often misunderstood. Boys’ needs are different to girls and in order to help our boys grow into wonderful men, parents, teachers and carers need to understand these needs and how to meet them. 

Maggie draws her wisdom not only from the research that has gone into writing 10 books, but from parenting her own four sons, teaching in high schools for over 17 years, counselling troubled lads and working with men in her men’s-only seminars. She is a champion of boys and wants you to be one too.

LOGISTICS

Tickets are $35 and available from: www.trybooking.com/RIGP

Doors open 6.15pm for a prompt 7pm-9pm seminar.

Please note if this event sells out there will be no waiting list. 

SEATING is general allocation... there are no fixed seat numbers.

BABIES... babes in arms are welcome.

Inquiries: teammaggie@maggiedent.com`,`Boys, Boys, Boys (Brisbane) with Maggie Dent`,`Boys, Boys, Boys (Brisbane) with Maggie Dent`);
this.addEvent(`The Killers at Brisbane Entertainment Centre, Brisbane`,`The Killers at Brisbane Entertainment Centre, Brisbane`,`2018-04-27T19:00:00+1000`,`Brisbane Entertainment Centre`,`The Killers
Presented by Frontier Touring and Triple M Brisbane

--

We're thrilled to announce the return of The Killers to Australia and New Zealand in April and May 2018! 

The widely-acclaimed rock band will play seven arena shows on their biggest Australasian tour to date, touring in celebration of their fifth studio album Wonderful Wonderful (out 22 Sep).

--

FRONTIER MEMBERS PRE-SALE
Begins: Wed 27 Sep (2pm AEST)
Ends: Thu 28 Sep (2pm AEST)
(or ends earlier if pre-sale allocation exhausted)
Sign up: frontiertouring.com/signup

SPECIAL ALBUM PRE-SALE OFFER
Buy tickets in the Frontier Members Pre-sale and you can add a digital download of The Killers’ new album Wonderful Wonderful to your order for just $9.99! This will appear as an option on the Ticketek page before you complete your transaction.

GENERAL PUBLIC ON SALE
Begins: Tue 3 Oct (2pm AEST)

TICKETS FROM
http://frntr.co/TheKillersBris | Ph: 132 849

EVENT INFORMATION
frontiertouring.com/thekillers`,`The Killers at Brisbane Entertainment Centre, Brisbane`,`The Killers at Brisbane Entertainment Centre, Brisbane`);
this.addEvent(`The Color Run - Brisbane QLD ***Expression Of Interest***`,`The Color Run - Brisbane QLD ***Expression Of Interest***`,`2017-12-31T10:00:00+1000`,`Brisbane, QLD`,`This event will not be held on New Years Eve
DATE & LOCATION TO BE CONFIRMED 
***THIS IS EXPRESSION OF INTEREST ONLY***

Participants will experience an all-new Tropicolor Zone™ on course, where they will be bathed in a tropical array of colors and delicious island scents as they pass through the shade of palm trees, arches, and island-style music.

At the Finish Festival, Color Runners will enjoy even more fun at Rainbow Beach, an interactive island featuring music, dancing, unique photo opportunities, and massive color throws.

Each Color Runner will also receive a limited-edition Tropicolor race shirt, finisher’s medal on a floral-printed ribbon, embroidered headband, and fun temporary tattoos. It doesn’t matter if it’s your first experience with The Color Run or you’ve been joining in for years, the Tropicolor World Tour will be the most memorable 5k of your life.`,`The Color Run - Brisbane QLD ***Expression Of Interest***`,`The Color Run - Brisbane QLD ***Expression Of Interest***`);
this.addEvent(`Obstacle Hell Brisbane 2018 - now on sale!`,`Obstacle Hell Brisbane 2018 - now on sale!`,`2018-02-10T06:00:00+1000`,`62-68 Cash Ave, Samford Village QLD 4520, Australia`,`Obstacle Hell Brisbane 2018 is ON SALE !!! Ends Halloween!

Save $13.00 off each ticket simply by using the special discount code - hellsale - at www.obstaclehell.com

ONLY 100 TICKETS AT THIS PRICE - NO MORE CAN BE RELEASED .... Normally $69 ... On Sale Only $56 for Adults $26 for kids aged 12-16.

You will be muddy, you will sweat, however you will love every second of it. Grab a team together or simply challenge yourself in hell .. Obstacle Hell!

NOT A RACE - NOT A COMPETITION - IT'S ALL ABOUT FUN!

Get your tickets now @ www.obstaclehell.com`,`Obstacle Hell Brisbane 2018 - now on sale!`,`Obstacle Hell Brisbane 2018 - now on sale!`);
this.addEvent(`Laneway Festival 2018, Brisbane`,`Laneway Festival 2018, Brisbane`,`2018-02-10T11:30:00+1000`,`Brisbane Showgrounds`,`ON SALE NOW!

Laneway Festival is super proud to unveil our main line-up for 2018! Let us present the soundtrack to your summer:

Aldous Harding - Alex Cameron - Amy Shark - Anderson .Paak & The Free Nationals - BADBADNOTGOOD - Billie Eilish - Bonobo - Cable Ties - City Calm Down - Dream Wife - Father John Misty - KLLO - Loyle Carner - Mac DeMarco - Miss Blanks - Moses Sumney - ODESZA - Rolling Blackouts Coastal Fever - (Sandy) Alex G - Shame - Slowdive - Sylvan Esso - The Babe Rainbow - The Internet - The War on Drugs - TOKiMONSTA - Wolf Alice

Keep an eye on our socials and sign up to our newsletter at www.lanewayfestival.com to hear all the updates first. 

Laneway Festival Brisbane is 16+.

#Laneway2018`,`Laneway Festival 2018, Brisbane`,`Laneway Festival 2018, Brisbane`);
this.addEvent(`Lana Del Rey - Brisbane`,`Lana Del Rey - Brisbane`,`2018-03-29T19:00:00+1000`,`Riverstage`,`Don’t miss out, get access to the presale and buy tickets from Friday 20th October, 5pm AEDT. General on sale kicks off Monday 23rd October 11am AEDT. No code or password required. 

Her debut album, Born To Die was released in January 2012 and charted at number one on the official UK Album Chart, peaked number two on the US charts and was the fifth best-selling album of 2012. Her extended play Paradise followed that November, garnering her first Grammy nomination for Best Pop Vocal Album. Ultraviolence (2014), her third studio album, became her first album to reach number one in the US. In 2015, she released her fourth studio album, Honeymoon. Both albums received positive critical response.

Del Rey reached her widest audience when she released the song Video Games online in June 2011, following it up with an accompanying video in August 2011. Video Games accumulated 20 million views within its first 5 months.

Lana’s fifth studio album and fourth major-label record, Lust For Life, was released on July 21st. The album received critical acclaim, and became her second album to reach No. 1 in the United States, while also reaching the top ten in almost every other country it charted in. The lead single, titledLove, was released worldwide on February 18th. The title track, which features The Weeknd, was released on April 19th as the second single. The album also features guest appearances from A$AP Rocky, Stevie Nicks, Sean Lennon, and Playboi Carti.`,`Lana Del Rey - Brisbane`,`Lana Del Rey - Brisbane`);
this.addEvent(`Sebastian Bach (USA) Australian Tour!`,`Sebastian Bach (USA) Australian Tour!`,`2017-10-21T17:00:00+1100`,`Perth, Adelaide, Brisbane, Sydney, Melbourne`,`⚡  SEBASTIAN BACH, the Original Voice of SKID ROW returns this October! ⚡
Book Now ➤ http://metropolistouring.com/sebastianbach/

Set list full of SKID ROW Classics - 18 and Life, Youth Gone Wild, I Remember You, Monkey Business, Slave To The Grind plus More!
Book Now ➤ http://metropolistouring.com/sebastianbach/

Sat 21st Oct. Perth – Astor Theatre
Sun 22nd Oct. Adelaide – The Gov
Thur 26th Oc. Brisbane – The Tivoli
Fri 27th Oct. Sydney – Manning Bar
Sat 28th Oct. Melbourne – Forum Theatre
Book Now ➤ http://metropolistouring.com/sebastianbach/`,`Sebastian Bach (USA) Australian Tour!`,`Sebastian Bach (USA) Australian Tour!`);
this.addEvent(`Take A Hike - Brisbane`,`Take A Hike - Brisbane`,`2017-10-22T07:00:00+1000`,`Kurilpa Point Park, South Brisbane`,`AEIOU Foundation's annual Take A Hike Brisbane fundraiser is on again! It just keeps getting bigger and better every year, and we want you and buddies to join us in 2017. 

What better way to spend a Sunday morning than walking or running along the Brisbane riverbank, all the while raising vital funds to create a lifetime of opportunities for children with autism?

The following distances are sure to suit your stamina and fitness level:

• *5km for the Sunday Stroller (NEW for 2017!)
• 10.5km for the Social Runner/Walker
• 21km for the Half Marathon Heroes

Grab your running shoes out of the cupboard and kickstart your fundraising plan. We'll help you with tips along the way.

Register at www.takeahike.org.au

On registration, you'll open your own Hero Page to share with family, friends and colleagues. They can support your herculean efforts by donating to your Hero Page.

Call on your colleagues, business associates, friends and family and get a team together today.

OUR MISSION IS FOR ALL CHILDREN WITH AUTISM TO ACCESS OUR LIFE CHANGING SERVICES. YOUR COMMITMENT HELPS US TO ACHIEVE THIS GOAL.`,`Take A Hike - Brisbane`,`Take A Hike - Brisbane`);
this.addEvent(`DARK LAKE Brisbane - Three Shows Only!`,`DARK LAKE Brisbane - Three Shows Only!`,`2018-01-04T21:30:00+1000`,`Brisbane, QLD`,`DARK LAKE RETURNS TO BRISBANE - FOR THREE NIGHTS ONLY! 

Our interactive horror classic has toured throughout Australia and New Zealand, and now returns to Brisbane for three shows only!

As part of the launch of the sequel DARK LAKE 2 : RISING WATERS, the original DARK LAKE has three dates in Brisbane!  

Nobody quite knows what's wrong with Dark Lake. Inexplicable things happen there. People go missing. People go there after dark, then come out...strange. Changed, somehow. People see things, they hear voices...No one knows what's causing the pervasive air of menace around this place. Rumours of hauntings and unquiet spirits abound.

Prepare yourself to go down the twisting pathways of Dark Lake...

After entering a darkened waterside at night, participants find themselves unexpectedly invited to a little girl’s
birthday party. But as they try to find their way to the celebration, they soon discover that no party in this dark and threatening place can be anything other than a nightmare...

Only for audiences 15 and over, the performance is designed to be genuinely scary. 

This is a walk- around performance, where small groups move through the story at a time. Audience groups encounter actors spaced throughout the performance area who construct the story around and including them.

Please read our F.A.Q. here : http://www.interactivehorrorexperience.com/faq-1

PLEASE NOTE: AUDIENCE NUMBERS ARE STRICTLY LIMITED! 
BOOK EARLY - WE SELL OUT FAST! FIVE NIGHTS ONLY! 

WHERE : AT A SECRET LOCATION IN METRO BRISBANE! BUY TICKETS TO RECEIVE YOUR MAP AND TICKET PACK!

WHEN : - Thursday 4th January from 7.30pm
- Friday 5th January from 7.30pm
- Saturday 6th January from 7.30pm

IMPORTANT ; When you book, you will receive a start time that is just for you and your guests. If you book in a group larger than six, you will be asked to separate and will be given consecutive start times 10 minutes apart.

DUE TO THE UNIQUE NATURE OF THE EXPERIENCE, YOU MUST ARRIVE ON TIME. LATECOMERS CANNOT BE ADMITTED.

*TICKET PRICES & OPTIONS* 

- DOUBLE FEATURE - See both the original DARK LAKE and the brand new sequel, DARK LAKE 2 : RISING WATERS at a  great discount price with our new Double Feature ticket! Book your shows for the dates you want and save yourself a full $20 off the price of your tickets! - DOUBLE FEATURE ONLY $59.90 

- DARK LAKE LAUNCH TICKETS - $29.90 for the FIRST TEN TICKETS ON EACH DATE ONLY! Be amongst the first to book DARK LAKE and save $10 off the regular purchase price! 

- Adults - $39.90 
- Concession - $35.90 (Students, Health Care Cards, Seniors)
- Group Discount (MINIMUM 6) - $34.90 

Click the link to go straight to our online ticket shop now : 

https://www.huntedexperience.com/ticket-shop-1/DARK-LAKE-BRISBANE-c25049302`,`DARK LAKE Brisbane - Three Shows Only!`,`DARK LAKE Brisbane - Three Shows Only!`);
this.addEvent(`Post Malone | Brisbane **SOLD OUT**`,`Post Malone | Brisbane **SOLD OUT**`,`2018-01-05T17:00:00+1000`,`Eatons Hill Hotel`,`** POST MALONE VENUE UPGRADED TO EATON’S HILL OUTDOOR STAGE **

SHOW SOLD OUT!

After selling out his debut Brisbane show in minutes we’re thrilled to announce Post Malone’s Jan 5th show has been upgraded to the outdoor stage at Eaton’s Hill Hotel!

** All tickets sold to the original EH show will automatically be accepted to the new show, you do not need to do anything or buy new tickets
** This is an All Ages event
** If we catch anyone scalping tickets for over the original price, you will have your booking cancelled and you be banned from the show (to dob in a scalper contact us over at: hello@fomofestival.com.au) 💛💛💛💛

•••

Recently shattering Apple Music’s single streaming record with 25 million streams in one week as well as holding the current #1 single in Australia & New Zealand for latest track “Rockstar”, is Post Malone. Due to overwhelming demand, and FOMO Brisbane selling out in a week, the widely acclaimed, alternative hip-hop wonder will play Brisbane's Eatons Hill Hotel on Friday 5 January, lighting up the stage with unreleased & new material as well as songs from his platinum selling debut album Stoney.`,`Post Malone | Brisbane **SOLD OUT**`,`Post Malone | Brisbane **SOLD OUT**`);
this.addEvent(`Parcels | Woolly Mammoth, Brisbane`,`Parcels | Woolly Mammoth, Brisbane`,`2018-01-12T19:00:00+1000`,`Woolly Mammoth`,`Parcels return to their beloved motherland. Australia.

Photo - Max Dorsogna and Carmen Crommelin`,`Parcels | Woolly Mammoth, Brisbane`,`Parcels | Woolly Mammoth, Brisbane`);
this.addEvent(`Day of the Dead Comes to Brisbane`,`Day of the Dead Comes to Brisbane`,`2017-10-27T20:00:00+1000`,`Brisbane, QLD`,`Day of the Dead comes to Brisbane!

🎉 Australia's largest confetti cannons 🎉
💀 Skull face painting 💀
🕺 World renowned circus acrobats 🕺
🔥 Stage flames & fire breathing show performers 🔥

It’s time for Dia De Los Muertos – Day of the Dead! In the last few years, Day of the Dead has exploded in popularity and this year we’ve decided to go MASSIVE. Think carnival atmosphere, candy skulls all over the place, and real Latin American flair!

We’ve gone all out on providing an authentic Dia De Muertos experience for you: expect world-renowned aerial acrobats, theatrical circus performers, and professional Latin dancers performing throughout the night! 

Day of the Dead just wouldn’t be the same without great music, and we’re pushing the boat out this year with live percussionist performances and a host of international DJs. Combined with Australia’s largest confetti cannons and CO2 guns, pyrotechnics and fire breathers, Day of the Dead is set to be the most insane spectacle of the year!

There will be plenty of opportunities for you to get involved with the Day of the Dead festivities – professional film makeup artists will be running a candy skull face painting station, and huge piñatas will be scattered around that will need teams of you to break open!

Make sure you don’t miss out on this year’s most spectacular event – Day of the Dead!

Please note: this event is not part of the Dia de los Muertos public holiday. This event has no significant religious meaning, and many of the traditions will not be taking place at this event.`,`Day of the Dead Comes to Brisbane`,`Day of the Dead Comes to Brisbane`);
this.addEvent(`Angus & Julia Stone | Brisbane`,`Angus & Julia Stone | Brisbane`,`2018-04-28T19:00:00+1000`,`Eatons Hill Hotel`,`Australia's favourite indie duo are back on the road in 2018!

Tickets: 
► http://bit.ly/AngusJuliaStone-Tickets

Australia’s most prolific and loved siblings, Angus & Julia Stone, are set to hit the road with a national tour this September, bringing their sun-drenched melodies to warm up our winter blues. Announcing five dates, including The Tivoli in Brisbane (which forms part of the upcoming Brisbane Festival program), Palais Theatre in Melbourne, the Enmore Theatre in Sydney, Adelaide’s Thebarton Theatre and Perth Concert Hall.

Joining Angus & Julia Stone is special guest Ruel. Quite literally the definition of ‘a natural’, at only 14 years of age Ruel has the soulful voice of a broken heart that had been smoking cigarettes and downing whiskey for the past 40 years. Discovered in 2015 by Grammy Award winning producer M-Phazes (Eminem, Kimbra, Daniel Johns, Meg Mac), Ruel would later make his introduction via featuring on the super producer’s single ‘Golden Years’. Their recent performance on triple j’s Like A Version clocked over half a million views in less than 48 hours and made it one of the highest viewed LAV’s of 2017. Executive produced by M-Phazes, Ruel’s debut EP is out later this year and it boasts a bold & unique sound for Australia’s newest musical prodigy.

‘Snow’ is the first taste of music to be unveiled from their highly-anticipated forthcoming studio album due out later this year. It brings a fresh mix of breezy rock with layered scratchy guitars, gentle organs and their signature intimate harmonic style. It’s simply stunning.

Fans get their first look at the new video for ‘Snow’ today Directed by Onil Kotain and Produced by Karim Sukarno. The video is as intimate and intoxicating as the track itself and sees Angus & Julia Stone wandering through a lost doorway in the desert, finding themselves in a snow lodge party with a bunch of cruisy gang having a good time. All of which serves as a prelude to their live shows this September.

Since the duo began performing together in 2006, their story has unfolded with an almost magical magnetism that has galvanised the world. Their four albums have amassed multi-platinum sales, with their latest single release ‘Snow’ already hitting #2 most played on triple j last week, #62 on the Shazam chart (with over 8,000 shazams) and over 800,000 Spotify plays! Whilst also winning a fan base of millions over spiraling tours of the UK, Europe and North America. The band have over 5 million listeners each month who tune in to stream their music from all over the world.

Ticket presale starts on Thursday at 10am, here: 
http://tidd.ly/8c0dd0bf`,`Angus & Julia Stone | Brisbane`,`Angus & Julia Stone | Brisbane`);
this.addEvent(`Ardijah LIVE - Gold Coast & Brisbane`,`Ardijah LIVE - Gold Coast & Brisbane`,`2017-11-03T20:00:00+1000`,`Parkwood Tavern, Gold Coast`,`★ Ardijah 'Midnight Train to Georgia Tour' 2017 ★

Friday 3rd November @ Parkwood Tavern, Gold Coast
Saturday 4th November @ The Back Room Brisbane (Chardons Corner Hotel)

Supported by Average Steve | Nofo Lameko | DJ Ideal

$40 GA tickets available from:
Nesian Roots Entertainment, send a PM or email info@nesianroots.com (no booking fee)
Online from www.nesianroots.oztix.com.au (+ BF)

$85 VIP Tickets available online only (+ BF). Includes Entry, VIP Ardijah Lanyard, Tour T-Shirt, Meet And Greet and Photo Opportunity`,`Ardijah LIVE - Gold Coast & Brisbane`,`Ardijah LIVE - Gold Coast & Brisbane`);
this.addEvent(`Chris D'Elia • The Tivoli, Brisbane`,`Chris D'Elia • The Tivoli, Brisbane`,`2017-10-28T19:30:00+1000`,`The Tivoli Brisbane`,`Due to overwhelming demand, Adelaide, Perth and Brisbane dates have been added to US comedian and actor Chris D’Elia’s upcoming debut Australian stand-up tour this October.

Known and loved by Australian audiences through his starring roles in NBC sitcom Undateable and Comedy Central’s Workaholics, Chris D'Elia is one of the most sought after comedians and actors in the comedy world. 

Tickets on sale now!`,`Chris D'Elia • The Tivoli, Brisbane`,`Chris D'Elia • The Tivoli, Brisbane`);
this.addEvent(`Deadly 60 Live In Brisbane: Afternoon Event!`,`Deadly 60 Live In Brisbane: Afternoon Event!`,`2018-01-20T14:00:00+1000`,`South Bank, Brisbane`,`After two sell-out Australian tours, Steve Backshall, the star of the hit TV show Deadly 60 is returning to Australia with his brand new stage show, 🐾 DEADLY 60 DOWN UNDER! 🐾

However this time there is big difference … this summer Steve will appear live on stage with some of Australia’s deadliest animals! 🐊 🐝 🐍

Join Steve as he shares the wildest Deadly footage from his times in Australia … being lowered from a helicopter to dangle into a crocodile’s nest, or hand catching the world’s most venomous octopus just off Sydney Harbour. Plus there will be loads of audience participation and lots of on stage fun!

Don’t miss Steve Backshall and some of Australia's deadliest wildlife on stage at the South Bank Piazza this summer!`,`Deadly 60 Live In Brisbane: Afternoon Event!`,`Deadly 60 Live In Brisbane: Afternoon Event!`);
this.addEvent(`Aaradhna with Live Band - Brisbane`,`Aaradhna with Live Band - Brisbane`,`2017-11-10T21:00:00+1000`,`The Back Room Brisbane`,`When: Friday 10th November
Where: The Back Room, Brisbane
Supports: JSQZE + J. Alexander
Tickets: $30 (no booking fee) from Nesian Roots Entertainment, email info@nesianroots.com or $30 + BF from www.nesianroots.oztix.com.au

Award winning Kiwi singer-songwriter Aaradhna has announced ‘The Amalgamation Tour’ with 4 shows in Australia this November, presented by Nesian Roots Entertainment

With a stellar career that spans four albums, including 2013’s TREBLE AND REVERB and 2016’s BROWN GIRL which debuted at #1 on the New Zealand Charts, Aaradhna is without question the number one female RnB voice of the South Pacific, and a serious contender on the world stage.

“With such intimate and revealing songwriting it's not surprising that Aaradhna's vocals are as soulful, impressive and, more importantly, as real as ever.”
- NZ Herald

An enigmatic performer who divides her time between New Zealand and the United States, Aaradhna most recently featured on Sons Of Zion’s track ‘Is That Enough’, hitting the global charts at #3 & is currently #1 on NZ’s Viral Top 50

Don't miss your chance to catch the supremely talented Aaradhna up close and personal.`,`Aaradhna with Live Band - Brisbane`,`Aaradhna with Live Band - Brisbane`);
this.addEvent(`No Pants Subway Ride Brisbane 2018`,`No Pants Subway Ride Brisbane 2018`,`2018-01-14T14:00:00+1000`,`Central station`,`WARNING: This is only for people who love a laugh, like having a bit of fun, and don't take themselves too seriously! :D

PLEASE SHARE THIS EVENT AND HASHTAG #NPSR!

Do you have a few hours free on Sunday 14th January 2018, and, like us, think pants are over-rated and should be hidden away like the annoying thing they are? Do you like the idea of catching a train without pants/shorts/skirt along with a bunch of others just for the sake of it? Think it'd be cool to give unsuspecting commuters and tourists something random to laugh at and talk about?

THEN WE WANT YOU!!!! AND YOUR FRIENDS!!!! AND THEIR FRIENDS!!!!


********************
This is a FREE event, however given the massive popularity of the ride, we need everyone who is attending to secure their free tickets here: https://www.eventbrite.com.au/e/no-pants-subway-ride-brisbane-2018-tickets-38526677329
********************

Complete logistics released closer to the date!

Unfortunately due to the nature of Facebook, its hard for people to see our event on their news feeds, so if you could just invite 5 of your friends to this event, that is bound to make sure we have a great turn out!

Not in Brisbane? Our friends from other cities aren't shy either!  We will post links as their events appear!

Overseas? Then check out all the other cities that are holding a No Pants Subway Ride here: https://improveverywhere.com/2017/01/03/global-no-pants-subway-ride-2017/


Read more information, other international locations, what you need, what to do, and other stuff about it at the link below. There's even some video of previous years from other locations around the world....
http://www.ozclubbers.com.au/nptr/


Want to make a bit of an impact with the ride but not sure what to wear as an extra to your outfit? Try these suggestions for the top half of your body:
* High Vis construction clothes
* Business suit
* Motorbike rider clothes
* Defence Force clothes (or imitation of)
* Firefighter clothes
* Raver (fluro) outfits
* Cosplay outfits

Or if you want to add some props to your whole get up, here's some suggestions:
* Pram
* Shopping Bags
* Briefcase (goes well with the business suit)
* Fake pregnancy belly (females only of course)
* Bicycle
* Rollable luggage
* High socks with or without print on them

Remember, the basic concept is to ride the trains without pants and pretend that it is the most normal, regular thing to do. If people were to see one person entering a train without pants on, they could easily pass them off as a crazy. But when more and more people enter a train without pants on with them, their reactions are just priceless!

If you are keen to participate, but are a bit uncomfortable or nervous about wearing underwear on the train, wear boxers. They're practically shorts anyway. If you are a bit more daring, throw on a pair of boyshorts/boylegs or trunks. It would be even funnier if they have some unusual or funny print on them too! And if you are really REALLY confident, go a pair of briefs!
Just remember, you must wear underwear, but no underwear that screams "I am doing a crazy stunt!", and no revealing underwear! We don't want to offend regular passengers.
And if you have worries or concerns about your "bits" accidentally showing or hanging out, secretly wear another pair of underwear underneath.

We will be having an after-party after the ride in our pantslessness, all 18+ riders are welcome to join us, make sure you bring your ID if you want to come to the after-party.

Big thanks goes out to ALT TeeVee who will be coming along to do the professional photos on the day, and who have been our active photography partner for the past #NPSR rides. Like their page in advance to ensure you see all the professional photos from the ride!

The No Pants Subway Ride is an annual global event started by Improv Everywhere in New York in 2002, and this one will be the 17th successful year they've done it! This will be our 9th one in Brisbane!

Check Improv Everywhere's website at http://improveverywhere.com/ - these guys do some hillarious other stuff as well, so check them out!

Also become a fan of the Brisbane Popup Comedy page here and see previous years photos from Brisbane: https://www.facebook.com/BrisbanePopupComedy`,`No Pants Subway Ride Brisbane 2018`,`No Pants Subway Ride Brisbane 2018`);
this.addEvent(`Thirsty Merc, The Zoo, Brisbane`,`Thirsty Merc, The Zoo, Brisbane`,`2017-11-02T20:00:00+1000`,`the zoo`,`15 years ago, Thirsty Merc bounded onto the music scene with their Summertime sounds, making their mark on radio and TV over the ensuing years and to celebrate this milestone, the band are heading back out on the road on their Take Me Back Tour kicking off in Brisbane on 2 November.

Thirsty Merc formed in Sydney in 2002 releasing their debut EP, First Work, in September, 2003, before being signed to Warner Music.  The band’s big break came in 2004 with the release of their debut, self titled, album which included the hits, Someday Someday and In The Summertime (the theme for Bondi Rescue since 2006).

Two more studio albums followed - Slideshows in 2007 (#4 ARIA Album) and Mousetrap Heart in 2010 (#14 on the ARIA Album chart) which included radio staples, 20 Good Reasons, Mousetrap Heart and Tommy and Krista

Fast forward to 2015 - Thirsty Merc released Shifting Gears, their first wholly independent and first new material in five years and spent the next few months crossing the country; running up thousands of Frequent Flyer points and sold out shows.

Besides the hits, the Take Me Back Tour is a celebration of all the music along the way and fans can expect to hear songs they’ve never heard the band perform live before.
Lead singer, Rai Thistlethwayte, said today: “It’s thanks to the fans that we’re still here, loving life and music, 15 years later and this tour is a big “thank you” to everyone who’s sung along with us over the years, as well as a great opportunity to dust off some songs we’ve never included in our shows”.

Hi res photos can be downloaded from HERE. 

Tickets for Thirsty Merc’s Take Me Back Tour shows are on sale NOW. 

Shifting Gears is out now through MGM Distribution




TAKE ME BACK TOUR

Thursday, 2 November 2017
The Zoo, Brisbane, QLD

Friday, 3 November 2017
Casino RSM Club, Casino, NSW

Friday, 10 November 2017
Prince of Wales, Bunbury, WA

Sunday, 12 November 2017
96FM Kickstart Summer Concert
With: Jimmy Barnes, Ian Moss & Daryl Braithwaite
Ascot Racecourse, Ascot, WA

Thursday, 16 November 2017 
The Basement, Canberra, ACT

Friday, 17 November 2017
Shoalhaven Heads Bowling Club, Shoalhaven Heads, NSW

	Saturday, 18 November 2017
With: +Live+, Lifehouse and The Calling 
Roche Estate, Hunter Valley, NSW

Thursday, 23 November 2017 
Cambridge Hotel, Newcastle, NSW

Friday, 24 November 2017
Taren Point Hotel, Caringbah, NSW

Saturday, 25 November 2017 
Australian Hotel & Brewery, 
Rouse Hill, NSW

Thursday, 30 November 2017
Manning Bar, Sydney, NSW
				
Friday, 1 December 2017 
Long Jetty Hotel, Long Jetty, NSW

Saturday, 2 December 2017
Narrabeen RSL, Narrabeen, NSW

Wednesday, 6 December 2017
Sooki Lounge, Belgrave, VIC

Thursday, 7 December 2017 
Mac’s Hotel, Melton, VIC

Friday, 8 December 2017 
York on Lilydale, Mt Evelyn, VIC

Saturday, 9 December 2017 
Gasometer Hotel, Melbourne, VIC

Thursday, 14 December 2017 
Village Hotel, Golden Grove, SA

Friday, 15 December 2017
Norwood Hotel, Norwood, SA

Saturday, 16 December 2017 
Fowlers Live, Adelaide, SA




www.thirstymerc.com 				Twitter: @thirstymerc 


Instagram: @thirstymercband	www.facebook.com/thirstymerc


#ThirstyMerc #TakeMeBack`,`Thirsty Merc, The Zoo, Brisbane`,`Thirsty Merc, The Zoo, Brisbane`);
this.addEvent(`Ebi - Live in Brisbane - Dec 2nd, 2017`,`Ebi - Live in Brisbane - Dec 2nd, 2017`,`2017-12-02T20:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`Ebi - The “50” World Tour - Finally arriving to Brisbane!

TICKETS WILL BE RELEASED SOON, click "going" on the event to get a notification when tickets are released. 

The 50 World Tour celebrates a lifetime of memories as Ebi, the King of Persian Pop cements his legacy as one of the greatest artists of our time as he embarks on his Final World Tour. 

Predestined to be the biggest and most iconic concert tour in Persian Music History, with an estimated audience of 100,000, during the span of 70 concert dates, in 4 continents, in more then 13 Countries, and 35 cities.

Join the Legend for a Magical Night, taking you on an unforgettable journey as he performs a masterful mix of his hits, transcending 3 generations of memories. 

In one sentence: This show will leave you mesmerized!

www.ETCEntertainment.com.au
Info, VIP, and Sponsorship Opportunities: 0412173134`,`Ebi - Live in Brisbane - Dec 2nd, 2017`,`Ebi - Live in Brisbane - Dec 2nd, 2017`);
this.addEvent(`Angus & Julia Stone 2018 - Brisbane`,`Angus & Julia Stone 2018 - Brisbane`,`2018-04-28T20:30:00+1000`,`Eatons Hill Hotel`,`Crisp and fresh as the Snow that frames their latest record, Angus & Julia Stone have quickly announced a 2018 Australian tour in the wake of their 2017 dates selling out in record time.

As new singles ‘Chateau’ and ‘Snow’ seep slowly and beautifully into our national consciousness, the softly spoken siblings fourth studio effort is shooting up the charts with a huge ARIA debut at #2, a feature album on triple j and over 9million streams collectively between the two lead singles on Spotify! The duo will perform at metro venues in Sydney, Melbourne and Brisbane in April and May next year.

Tickets to the 2017 Snow tour sold-out nationally in record time! For all of those disappointed fans, now is your chance to see all of your new favourite songs live.

Don’t miss out, get access to the presale and buy tickets Tuesday 17 October from 9am from secretsounds.com. 

General on sale kicks off Wednesday 18 October, 9am (AEDT)`,`Angus & Julia Stone 2018 - Brisbane`,`Angus & Julia Stone 2018 - Brisbane`);
this.addEvent(`DARKCELL's Psycho Circus 2017 Brisbane`,`DARKCELL's Psycho Circus 2017 Brisbane`,`2017-12-09T15:30:00+1000`,`The Brightside`,`Australia’s kings of creepy DARKCELL are back again, bringing their first annual event -  ‘PSYCHO CIRCUS 2017’.
This spooktacular showcase will explode with everything freaky Brisbane has to offer including 9 epic bands, Side Show performers, 8 Hours of entertainment & Dark carnival themes. 
Come one, Come all - The Freaks Are In Town!
Prizes for best dressed circus freak - Get creative!
HAIL TO THE FREAKS!

**TICKETS ON SALE NOW**
https://thebrightsidebrisbane.oztix.com.au/Default.aspx?Event=79731

**THE BANDS**
Darkcell
These Four Walls
Holistic
Dragonsmead
Seraphic
Flynn Effect
The_MOLOTOV
New Clear Vision
TrashQueen

**THE PERFORMERS**
TBA. More Info soon.`,`DARKCELL's Psycho Circus 2017 Brisbane`,`DARKCELL's Psycho Circus 2017 Brisbane`);
this.addEvent(`The Script at Brisbane Entertainment Centre, Brisbane`,`The Script at Brisbane Entertainment Centre, Brisbane`,`2018-04-21T18:00:00+1000`,`Brisbane Entertainment Centre`,`We're delighted to welcome Dublin three-piece The Script back to Australian shores in 2018 – three years overdue since their last headline shows Down Under!

The Irish rockers will perform for one night only in Melbourne, Sydney and Brisbane next April, joined by special guest JP Cooper who will make his Australian debut.

FRONTIER MEMBERS PRE-SALE
Begins: Mon 25 Sep (12noon AEST)
Ends: Tue 26 Sep (12noon AEST) 
(or ends earlier if pre-sale allocation exhausted)
Sign up: frontiertouring.com/signup

GENERAL PUBLIC ON SALE
Begins: Thu 28 Sep (12noon AEST)

TICKETS FROM
http://frntr.co/TheScriptBris | Ph: 132 849

EVENT INFORMATION
frontiertouring.com/thescript`,`The Script at Brisbane Entertainment Centre, Brisbane`,`The Script at Brisbane Entertainment Centre, Brisbane`);
this.addEvent(`Flatbush Zombies: Brisbane January 2018`,`Flatbush Zombies: Brisbane January 2018`,`2018-01-06T19:00:00+1030`,`Live Nation Australia & New Zealand`,`Brooklyn hip-hop trio, Flatbush Zombies Official are set to take over the East Coast this January for the first time since 2013. The three-piece outfit will play a one-off sideshow at Brisbane’s Max Watts as well as supporting Run The Jewels in Melbourne and Sydney. 

TOUR DATES
FESTIVAL HALL, MELBOURNE 	THURSDAY JANUARY 4*
BIG TOP AT LUNA PARK, SYDNEY 	FRIDAY JANUARY 5*
EATONS HILL HOTEL, BRISBANE 		SATURDAY JANUARY 6**
 
*Supporting Run The Jewels
**TICKETS ON SALE 12PM THURSDAY SEPTEMBER 28
**My Live Nation pre-sale: 10am September 26 until 10am September 28`,`Flatbush Zombies: Brisbane January 2018`,`Flatbush Zombies: Brisbane January 2018`);
this.addEvent(`PSA TOUR: Brisbane, QLD`,`PSA TOUR: Brisbane, QLD`,`2018-03-10T19:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`Fifth Harmony will hit the road this Fall on their PSA Tour to perform brand new material and fan-favorites with an all new stage production.  The tour will kick off after the release of their highly anticipated album “Fifth Harmony.”  

VIP packages are available at http://fifthharmony.co/VIP

For a full list of dates, visit http://fifthharmony.com

////

TEG Live, the promoter of Fifth Harmony, has regretfully advised, due to a change in schedule, it has become necessary to postpone this event until March 2018.  
Your ticket(s) are valid for the rescheduled date listed below and do not need to be exchanged. Simply present your existing ticket(s) at Brisbane Convention & Exhibition Centre on the new date.

Current Date & Venue: Wed 1 Nov 2017, Brisbane Convention & Exhibition Centre

Rescheduled Date & Venue: �Sat 10 Mar 2018, Brisbane Convention & Exhibition Centre

If you are unable to attend on the rescheduled date, you may secure a full refund (including a refund on your ticket insurance premium, where relevant) by posting your ticket(s) to the following address. All tickets must be received by Ticketek no later than Friday 1 December 2017.

Ticketek Rescheduled Show
�Fifth Harmony
�GPO Box 4000
�Brisbane QLD 4001`,`PSA TOUR: Brisbane, QLD`,`PSA TOUR: Brisbane, QLD`);
this.addEvent(`Ekali 'Babylon Tour' - Brisbane`,`Ekali 'Babylon Tour' - Brisbane`,`2017-10-20T19:30:00+1000`,`The Flying Cock`,`Ekali - Brisbane 

Friday October 20th | Doors 7:30PM - 11:00PM

Supports TBA | Tix via Moshtix

------------------------------------------------

Ekali is a Canadian instrumentalist and producer from Vancouver, BC. He started making electronic music in 2014, and since has been making big waves in the electronic community; from his visceral, captivating original work and collaborations to his thundering club remixes.

Ekali was accepted as Canada's sole participant in the Red Bull Music Academy in 2014. Since then, he's gone on to receive over twenty million streams, toured every corner of the world & received a writing credit on Drake's "If You're Reading This It's Too Late." His unique sound has earned him a loyal following worldwide, and cemented him as one of electronic music's most promising artists.

In 2016, Ekali was tapped for an official remix of Flume's "Smoke & Retribution feat. Vince Staples & Ku ka" and his Flux Pavilion "I Can't Stop" remix was officially signed and released by Big Beat. Ekali was also recently featured as a new & developing artist in HITS magazine. Over the summer of 2016, Ekali released a much anticipated official collaborative remix with Gravez of Jack Ü's "Mind (feat. Kai)." This was quickly followed up by an official remix on Australian label Future Classic for Ta-ku & Wafia's "Meet in the Middle" single. 

Ekali's 2016 headline fall was a huge success, selling out most shows throughout North America.

In 2017, Ekali has hit the festival circuit with performances at Electric Forest, Hard Summer, Shambhala, Buku, Forecastle, and Life is Beautiful, to name a few. Additionally, Ekali released a viral remix of "Don't Leave" by Snakehips, an original collaboration record with KRANE, debuted his season mix series called "Awakening," and was featured as a Diplo & Friends guest mixer on BBC Radio 1.`,`Ekali 'Babylon Tour' - Brisbane`,`Ekali 'Babylon Tour' - Brisbane`);
this.addEvent(`Paul Kelly at Riverstage, Brisbane`,`Paul Kelly at Riverstage, Brisbane`,`2017-11-11T18:00:00+1000`,`Riverstage Botanical Gardens`,`Paul Kelly
with special guests Steve Earle and Middle Kids
Presented locally by Triple M Brisbane

--

One of Australia’s most loved and respected artists Paul Kelly will embark on a colossal AU & NZ tour this summer!

Touring in celebration of his album Life Is Fine (out now through EMI) which just debuted at the top of the ARIA Album Chart, Kelly will tour Australia, visiting both regional and metro cities, before heading to New Zealand for three theatre performances.

FRONTIER MEMBERS PRE-SALE
Begins: Wed 23 Aug (12noon AEST)
Ends: Thu 24 Aug (12noon AEST) 
(or ends earlier if pre-sale allocation exhausted)
Sign up: frontiertouring.com/signup

GENERAL PUBLIC ON SALE
Begins: Mon 28 Aug (12noon local time)

TICKETS FROM
http://frntr.co/PaulKellyBrisbane | Ph: 136 100

EVENT INFORMATION
frontiertouring.com/paulkelly`,`Paul Kelly at Riverstage, Brisbane`,`Paul Kelly at Riverstage, Brisbane`);
this.addEvent(`Jazz Party The Flamin' Galah Brisbane`,`Jazz Party The Flamin' Galah Brisbane`,`2017-11-16T20:00:00+1000`,`The Flamin' Galah`,`Jazz Party are a band
Jazz Party are a party
Jazz Party was born on a Monday night
Jazz Party are Jazz Rats & fine musicianers 
Jazz Party are 8 people and many more
Jazz Party are a cult
Jazz Party is pronounced like this "Jazzparty"
Jazz Party are not sponsored by Mountain Goat Beer contrary to popular belief 
Jazz Party make music for the the people and for themselves.
Jazz Party take influences from everywhere 
Jazz Party are launching their debut album "MONDAY NIGHT" at the Flamin' Galah on NOVEMBER 16th with full band + guests. 
Supports TBA

JazzParty Loves you

<3`,`Jazz Party The Flamin' Galah Brisbane`,`Jazz Party The Flamin' Galah Brisbane`);
this.addEvent(`Ball Park Music - The Zoo, Brisbane (u18's)`,`Ball Park Music - The Zoo, Brisbane (u18's)`,`2018-02-24T19:00:00+1000`,`the zoo`,`w/ special guests ALI BARTER + Hatchie`,`Ball Park Music - The Zoo, Brisbane (u18's)`,`Ball Park Music - The Zoo, Brisbane (u18's)`);
this.addEvent(`UB40 at The Tivoli | Brisbane - SOLD OUT`,`UB40 at The Tivoli | Brisbane - SOLD OUT`,`2017-11-21T19:00:00+1000`,`The Tivoli Brisbane`,`UB40 BRING THEIR HITS BACK DOWNUNDER IN 2017

The UK’s most successful reggae band, UB40, will land in Australia in November 2017 playing all the hits and more including ‘Red Red Wine’, ‘Can’t Help Falling In Love’, ‘Kingston Town’, ‘Here I Am’ and countless others. 

Becoming a household name around the world throughout the 80s and 90s, UB40 (named after the UK’s unemployment benefit form) became known for reviving reggae across the world, filling the charts with their own songs and creating seminal versions of some of the world’s greatest tunes, crossing radio formats and continuing to dominate the airwaves to this day. 

With over forty top 40 hits in their native Britain and sales of over 100 million records, the band are one of the biggest UK music acts of all time, and continue to record charting albums while touring across the world including regular trips to Australia where they have firmly found a place in the hearts of fans.

“Our Australian tour in 2015 was so much fun for us we were very keen to ensure we got back as soon as possible,” said founding member songwriter Robin Campbell. “Unfortunately, scheduling has meant that November next year is our next opportunity, so rather than keep fans guessing, we wanted to let everyone know now and start the anticipation for what we hope will be 2017s biggest reggae party!”

After nearly four decades of success including their hit singles, international stadium tours, festival headline slots and the dramatic replacement of long-time lead singer Ali Campbell with his brother Duncan Campbell in 2008, the band continue with their key founding members and songwriting core, staying true to and building on the legacy and ethos of the band. 

UB40 are Robin Campbell (co-lead vocals and guitar), Duncan Campbell (lead vocals) Earl Falconer (bass, vocal), Brian Travers (sax and keyboards), Jimmy Brown (drums), Norman Hassan (percussion, vocals). The band also features Martin Meredith (sax) and Lawrence Parry (trumpet), who have both been in UB40’s touring line-up for over twenty years, and Tony Mullins (keyboards), creating a genre-defining synergy of horns and rhythm section that are uniquely UB40.`,`UB40 at The Tivoli | Brisbane - SOLD OUT`,`UB40 at The Tivoli | Brisbane - SOLD OUT`);
this.addEvent(`Harry Styles Live On Tour 2018 at Brisbane Entertainment Centre`,`Harry Styles Live On Tour 2018 at Brisbane Entertainment Centre`,`2018-04-28T19:00:00+1000`,`Brisbane Entertainment Centre`,`Harry Styles - Live On Tour

Debut album featuring "Sign of the Times" out now: http://hstyles.co.uk/music

Special guests to be announced soon.`,`Harry Styles Live On Tour 2018 at Brisbane Entertainment Centre`,`Harry Styles Live On Tour 2018 at Brisbane Entertainment Centre`);
this.addEvent(`360 : Vintage Modern Tour : Brisbane : Licensed / All Ages`,`360 : Vintage Modern Tour : Brisbane : Licensed / All Ages`,`2018-03-03T19:30:00+1000`,`The Triffid`,`After announcing the release of his fourth studio album, Vintage Modern (October 27th) alongside the hypnotic first taste YESTERDAY, the enigmatic 360 unveils dates for the Vintage Modern National Tour, a massive all-ages outing across Australia his first in over three years. 

Tickets go on-sale to 360’s private fan club The Close Circle on Tuesday 17th and to general public on Thursday October 19th.

For more info visit www.360music.com.au`,`360 : Vintage Modern Tour : Brisbane : Licensed / All Ages`,`360 : Vintage Modern Tour : Brisbane : Licensed / All Ages`);
this.addEvent(`New Moon Sound Healing Journey with Suntara - Brisbane`,`New Moon Sound Healing Journey with Suntara - Brisbane`,`2017-11-18T19:00:00+1000`,`Yoga In Daily Life Brisbane`,`Sound Healing Journey with Suntara - Brisbane

Tickets: https://brisbane-suntara.eventbrite.com.au
Investment: $35

Relax and let go completely, let the soothing sounds wash over you and carry you on a journey to stillness and bliss.

Suntara’s Sound Healing journey is a unique experience of the power of sound vibration. Suntara create powerful soundscapes to unblock energy and vibrate your body into a state of well-being and harmony. 

People report various effects from the session including, complete relaxation, feeling "Clear", reduced pain & stress, restful sleep for the nights after, Altered states of consciousness, Balancing of Chakras/Energy, Clarity / Resolution of difficult situations. Daniel Coates uses his powerful voice to deliver chants from a variety of ancient traditions such as Australian Aboriginal, American Indian, Celtic and various styles of harmonic singing. Crystal Bowls, Gasong Drums, Andean flutes and other instruments are also integral to the experience.

For more information visit: 
http://www.suntaramusic.com`,`New Moon Sound Healing Journey with Suntara - Brisbane`,`New Moon Sound Healing Journey with Suntara - Brisbane`);
this.addEvent(`The Belligerents: Science Fiction Tour - Brisbane`,`The Belligerents: Science Fiction Tour - Brisbane`,`2017-11-11T20:00:00+1000`,`the zoo`,`Tickets sale NOW via: http://bit.ly/2vOlL9P

Presented by Converge Mgmt + 123 Agency and Supported by triple j

The Belligerents are excited to announce a national tour in support of their excellent album Science Fiction, out September 8.
Recorded on a farmhouse on Stradbroke Island during the North Queensland summer, the album is a confident and expansive step forward for the Brisbane five-piece. The 11-song collection includes album singles ‘Caroline’, ‘Before, I Am’ and ‘Flash’, and explores the far reaches of worldly psych-pop.

“As a band we've been holding back on playing the album tracks live for what seems like a really long time now”, says Lewis Stephenson from the band. “We’re incredibly excited to get back on the road and play them to everyone who’s been with us on the journey so far.”

Six years on from their formation, no-one can accuse The Belligerents of being in a rush. Their debut full-length statement Science Fiction rewards the wait.

Joining them on all east coast dates is Sydney newcomer Bus Vipers, who recently signed to Future Classic. 

++Special Guests:

IVEY`,`The Belligerents: Science Fiction Tour - Brisbane`,`The Belligerents: Science Fiction Tour - Brisbane`);
this.addEvent(`Fall Out Boy in Brisbane`,`Fall Out Boy in Brisbane`,`2018-02-28T18:00:00+1000`,`Riverstage`,`Get tickets for Fall Out Boy concert in Brisbane, 28 Feb 2018 on ConcertWith.Me - http://cwm.io/8eba25

All tickets on Concertwith.Me covered by our guarantee.

You will receive a 100% refund for your tickets if:

- Your order was accepted but not delivered by the seller.
- Your order was accepted but not delivered in time for the event.
- Your event is cancelled and is not rescheduled.
- Your tickets were not valid for entry.
- You can purchase your tickets with peace of mind knowing we have you covered.`,`Fall Out Boy in Brisbane`,`Fall Out Boy in Brisbane`);
this.addEvent(`Ruby Fields - P Plates Tour - Brisbane`,`Ruby Fields - P Plates Tour - Brisbane`,`2017-11-10T19:00:00+1000`,`Black Bear Lodge`,`Coming to Brizzy to play my first headline show. See ya there!`,`Ruby Fields - P Plates Tour - Brisbane`,`Ruby Fields - P Plates Tour - Brisbane`);
this.addEvent(`Drake - The Boy Meets World Tour, Brisbane`,`Drake - The Boy Meets World Tour, Brisbane`,`2017-11-10T20:00:00+1000`,`Brisbane Entertainment Centre`,`Fri 10 Nov - Brisbane Entertainment Centre

Frontier Touring Members pre-sale: Tue 12 Sep (4pm) - Thu 14 Sep (4pm) or until pre-sale allocation exhausted

Tickets on sale: Fri 15 Sep (4pm) - draketour.com.au

Licensed all ages event
------------------
Following his phenomenally successful ‘Boy Meets World’ tour across Europe, Grammy-Award winning and platinum-selling recording artist Drake he will bring the tour to Australia and New Zealand in November 2017. The tour commences on Friday 3 November at Spark Arena in Auckland. It will then move on to Australia back-to-back shows at Sydney’s Qudos Bank Arena, one night at Brisbane Entertainment Centre and two dates at Melbourne’s Rod Laver Arena. Tickets for the tour go on general sale on Friday 15 September.
 
Drake has asserted himself as a trailblazer across the creative world - holding the record for highest-grossing hip-hop tour, most streamed artist on Spotify and Apple Music, most streamed album debut (384.8 million, knocking off his own previous record), most streamed song on Spotify (‘One Dance’), most simultaneous songs in the Billboard Hot 100, most number one hits on Billboard’s R&B/Hip-Hop Chart, career high songs in the Billboard Hot 100 (157) and the list goes on. Since debuting in the Billboard Hot 100 on May 23, 2009, he has never not been in the Hot 100 chart. Drake commands massive influence in the hip-hop and contemporary music space as he continues to create and dominate on a worldwide scale.`,`Drake - The Boy Meets World Tour, Brisbane`,`Drake - The Boy Meets World Tour, Brisbane`);
this.addEvent(`Culture Club - Australia 2017 - Brisbane QLD (BEC)`,`Culture Club - Australia 2017 - Brisbane QLD (BEC)`,`2017-12-02T19:00:00+1000`,`Brisbane Entertainment Centre`,`** TICKETS ON SALE: MON 10 JULY 2017 **
EVENT START & END TIMES TO BE CONFIRMED
_______________
Proudly presented by 
ONE WORLD ENTERTAINMENT

International superstars Culture Club have announced they will be touring Australia later this year.  Culture Club are led by front man, Boy George, currently endearing himself to new Australian audiences as their favourite coach on TV’s top rated show The Voice.  Thus, this tour is bound to take Culture Club to a large legion of new fans. 

In 2016, their triumphant return sold out some of the world’s most iconic venues including the Hollywood Bowl in Los Angeles (two nights) and London's famous Wembley Arena.  Culture Club proceeded to sell out shows across the rest of the world including the UK, Europe and USA, making their resurgence one of the most noteworthy success stories of today.  Musically, they are sounding better than ever as Boy George and the rest of the original line-up including Roy Hay, Jon Moss, and Mikey Craig are now joined by an incredible group of great musicians including extra percussionists, keyboard players, backing singers and a horn section.  This bigger line up now stands as an incredible musical revue that adds a whole new element of warmth and sound to their live shows, all of which are consistently receiving glowing reviews.  

Special guests will be Thompson Twins’ Tom Bailey, who will play hits live for the first time in 27 years.  For nearly three decades, fans of the Thompson Twins have been waiting for more live performances from one of the biggest bands of the 80’s.   Thompson Twins had huge hits - songs such as 'Hold Me Now', 'Doctor Doctor', 'You Take Me Up' and 'Love On Your Side' provided the soundtrack for so many people's lives worldwide in the mid-eighties.  It’s been 32 years since Thompson Twins have been to Australia and no doubt fans will welcome Tom Bailey back with open arms.  Says Tom: "This will be the first time I've sung the Thompson Twin's hits in decades. It's taken a long time, but now I'm really looking forward to playing those songs to some of the fans that were there first time around."

Featuring Grace Knight on vocals and Bernie Lynch on guitar and vocals, Eurogliders took the charts by storm in the 1980s.  In 1984, Eurogliders released their album This Island, which spawned their No. 2 hit single, ‘Heaven (Must Be There).’  Another Australian top ten album, Absolutely, followed in 1985, which provided three further top ten singles, ‘We Will Together’, ‘The City of Soul’ and ‘Can’t Wait to See You.’ Grace and Bernie, along with their superb band, have reunited to once again captivate audiences with their sophisticated and high-energy brand of pop. Eurogliders will play all shows (except Perth).

The Human League will be special guests for Perth audiences only (as part of the Culture Club tour).  The Human League have sold millions of records, inspired two generations of artists, written some of the all-time great classic pop songs, had No. 1’s across the world and yet still remain fiercely independent.   Watch this space for more Human League headline shows to be announced in other cities in the coming weeks.

_______________
Proudly presented by 
ONE WORLD ENTERTAINMENT

CULTURE CLUB - LIVE IN AUSTRALIA 2017 

Thursday 30th November
Rod Laver Arena, Melbourne
Tickets available from:
www.ticketek.com.au
Special guest:  Thompson Twins’ Tom Bailey
Support act:  Eurogliders

Friday 1st December
ICC, Sydney
Tickets available from:
www.ticketek.com.au
Special guest:  Thompson Twins’ Tom Bailey
Support act:  Eurogliders

Saturday 2nd December
Brisbane Entertainment Centre
Tickets available from:
www.ticketek.com.au
Special guest:  Thompson Twins’ Tom Bailey
Support act:  Eurogliders

Sunday 3rd December
Newcastle Entertainment Centre
Tickets available from:
www.ticketek.com.au
Special guest:  Thompson Twins’ Tom Bailey
Support act:  Eurogliders

Tuesday 5th December
Wollongong Entertainment Centre
Tickets available from:
www.ticketmaster.com.au
Special guest:  Thompson Twins’ Tom Bailey
Support act:  Eurogliders

Wednesday 6th December
AIS, Canberra
Tickets available from: 
www.ticketek.com.au
Special guest:  Thompson Twins’ Tom Bailey
Support act:  Eurogliders

Thursday 7th December
Adelaide Entertainment Centre
Tickets available from:
www.ticketek.com.au
Special guest:  Thompson Twins’ Tom Bailey
Support act:  Eurogliders

Saturday 9th December
Perth Arena
Tickets available from:
www.ticketek.com.au
Special guests:  Thompson Twins’ Tom Bailey & The Human League

___________________

CULTURE CLUB NOTES:

•	The group achieved stunning success in the 80’s, scoring three Top Ten US hits from their debut album, Kissing to Be Clever and becoming the first group to hit that milestone since The Beatles

•	The album, Kissing to be Clever, went platinum in the US and Culture Club then went on to sell over 100 million singles, 50 million albums worldwide, with Top 10 hits in every country—with smash hits including “Karma Chameleon,” “Do You Really Want To Hurt Me,” and “Time”

•	They are considered one of the most representative and influential groups of all time.  In the 80’s they were the first multi-racial band with an openly gay front man, Boy George

•	They are the first band since Beatles to have 3 songs from their debut album 1982's Kissing to Be Clever reach the Top 10 of Billboard's Hot 100 – including  "Do You Really Want to Hurt Me," "Time (Clock of the Heart)" and "I'll Tumble 4 Ya"

•	Their second album Colour By Numbers, sold over 10 Million albums and went Triple Platinum in the UK and Quadruple platinum in the US. It currently sits at number 96 on Rolling Stone’s “100 Best Albums of the 1980s”

•	Colour By Numbers, sold 4 million copies in the US and another 5 million worldwide at its time of release

•	“Time (Clock of the Heart)” is included on the Rock and Roll Hall of Fame's list of 500 songs that shaped rock and roll

•	“Karma Chameleon” became best-selling single of 1983 in the U.K. and was one of the Top 20 best-selling singles worldwide of the 1980’s

•	In November 2014 the band released, More Than Silence, their first single together since 1999 

_______________
Proudly presented by 
ONE WORLD ENTERTAINMENT`,`Culture Club - Australia 2017 - Brisbane QLD (BEC)`,`Culture Club - Australia 2017 - Brisbane QLD (BEC)`);
this.addEvent(`The xx - I See You Tour: Brisbane, Australia`,`The xx - I See You Tour: Brisbane, Australia`,`2018-01-17T18:00:00+1000`,`Riverstage Botanical Gardens`,`The xx at Riverstage
w/ special guests Kelela & Earl Sweatshirt
Wednesday January 17 2018

Tickets available from  thexx.info/tour

The xx FAN CLUB PRE-SALE
Begins: Mon 21 Aug (10am AEST)
Ends: Wed 23 Aug (10am AEST) 

FRONTIER MEMBERS PRE-SALE
via frontiertouring.com/thexx
Begins: Tue 22 Aug (12noon AEST)
Ends: Wed 23 Aug (12noon AEST) 
(or ends earlier if pre-sale allocation exhausted)

HANDSOME TOURS PRE-SALE
via handsometours.com/thexx
Begins: Tue 22 Aug (12noon AEST)
Ends: Wed 23 Aug (12noon AEST) 
(or ends earlier if pre-sale allocation exhausted)

SPOTIFY PRE-SALE 
Begins: Wed 23 Aug (12noon AEST)
Ends: Thu 14 Aug (12noon AEST) 
(or ends earlier if pre-sale allocation exhausted)

GENERAL PUBLIC ON SALE
Begins: Fri 25 Aug (12noon local time)

Jamie’s remix of On Hold is now live, listen here http://xxe.ht/horj-ty`,`The xx - I See You Tour: Brisbane, Australia`,`The xx - I See You Tour: Brisbane, Australia`);
this.addEvent(`Take That Live In Brisbane`,`Take That Live In Brisbane`,`2017-11-18T20:00:00+1000`,`Brisbane Entertainment Centre`,`Take That are coming to Australia and New Zealand! Tickets on sale Thursday April 13, 9am.

11 November 2017 - Perth Arena
13 November 2017 - Adelaide Entertainment Centre
15 November 2017 - Melbourne Rod Laver Arena
17 November 2017 - Sydney Qudos Bank Arena
18 November 2017 - Brisbane Entertainment Centre
19 November 2017 - Newcastle Entertainment Centre
21 November 2017 - Wellington TSB Bank Arena
22 November 2017 - Auckland - The Trusts Arena`,`Take That Live In Brisbane`,`Take That Live In Brisbane`);
this.addEvent(`Cigarettes After Sex - The Zoo, Brisbane`,`Cigarettes After Sex - The Zoo, Brisbane`,`2018-01-04T20:00:00+1000`,`the zoo`,`Handsome Tours and Jet Black Cat Music present the debut Australian tour for ambient pop band Cigarettes After Sex including a headline show in Brisbane.

CIGARETTES AFTER SEX
THE ZOO
THU 4TH JANUARY, 2018
TICKETS: http://bit.ly/2hLwtw0

Swooning in the spirit of influences such as Mazzy Star and Red House Painters, the band's gorgeously cinematic debut includes their first single “Nothing's Gonna Hurt You Baby”. The song has clocked up over 70 million YouTube streams and was a soundtrack highlight in current TV favourite The Handmaid's Tale. 

Immersive, cohesive and transporting, don't miss your chance to experience an unforgettable live show from Cigarettes After Sex in January 2018.`,`Cigarettes After Sex - The Zoo, Brisbane`,`Cigarettes After Sex - The Zoo, Brisbane`);
this.addEvent(`Ball Park Music - The Tivoli, Brisbane`,`Ball Park Music - The Tivoli, Brisbane`,`2018-02-23T17:00:00+1000`,`The Tivoli Brisbane`,`w/ special guests ALI BARTER + Hatchie`,`Ball Park Music - The Tivoli, Brisbane`,`Ball Park Music - The Tivoli, Brisbane`);
this.addEvent(`Foo Fighters at Suncorp Stadium, Brisbane`,`Foo Fighters at Suncorp Stadium, Brisbane`,`2018-01-25T18:00:00+1000`,`Suncorp Stadium`,`Foo Fighters
with special guests Weezer and DZ Deathrays
Presented locally by Frontier Touring, Triple M Brisbane, Foxtel & MAX

--

Hearts, minds and attendance records are set to be blown in January and February 2018 as Foo Fighters return to rock stadiums across AU & NZ in support of their ninth studio album Concrete and Gold (out 15 September on Roswell Records/RCA Records through Sony Music Entertainment Australia and New Zealand). 

FRONTIER MEMBERS PRE-SALE
Begins: Tue 19 Sep (3pm AEST)
Ends: Wed 20 Sep (3pm AEST) 
(or ends earlier if pre-sale allocation exhausted)
Sign up: frontiertouring.com/signup

SPECIAL PRE-SALE ALBUM OFFER
Buy tickets in the Frontier Members Pre-sale and you can add a copy of Foo Fighters' new album Concrete and Gold to your order for just $15! Head to the ticketing page for more info.

GENERAL PUBLIC ON SALE
Begins: Fri 22 Sep (3pm AEST)

TICKETS FROM
http://frntr.co/FFBri | Ph: 132 849

EVENT INFORMATION
frontiertouring.com/foofighters`,`Foo Fighters at Suncorp Stadium, Brisbane`,`Foo Fighters at Suncorp Stadium, Brisbane`);
this.addEvent(`Noname at The Triffid, Brisbane`,`Noname at The Triffid, Brisbane`,`2017-12-05T19:30:00+1000`,`The Triffid`,`Following on from a sold out North American headline tour that MTV described as "life-affirming", Chicago rapper Noname announces her debut Australian headline tour this summer.

Alongside already announced Fairgrounds and Meredith Music Festival appearances, Noname will begin her Australian tour at Brisbane’s The Triffid on Tuesday 5 December, followed by an all-ages show at Sydney’s Metro Theatre on Wednesday 6 December, and a final show at Melbourne's 170 Russell on Sunday 10 December. She'll be joined by special guests Billy Davis and the Good Lords for all dates.

TICKETS ON SALE NOW: https://tickets.oztix.com.au/Default.aspx?Event=77566

Hailed by The FADER and Rolling Stone as one of the most important new artists of her generation, Noname (aka Fatimah Warner) first appeared as a guest on Chance The Rapper’s breakthrough mixtapes, with stunning features on both Acid Rap and Coloring Book. She released her debut mixtape, Telefone, as a free download last July, a release that blurred the lines of spoken word poetry and rap and gaining critical acclaim from the likes of New York Magazine, Pitchfork and Dazed & Confused.`,`Noname at The Triffid, Brisbane`,`Noname at The Triffid, Brisbane`);
this.addEvent(`Ziggy Alberts | QPAC Concert Hall, Brisbane`,`Ziggy Alberts | QPAC Concert Hall, Brisbane`,`2017-11-11T19:00:00+1000`,`QPAC - Concert Hall`,`Heaven | Australia Tour 2017

"Ziggy Alberts announces his biggest shows yet alongside new single release.”

Returning home from his headline tour around Europe, Ziggy Alberts has announced the release of his new single, Heaven, along with 5 massive theatre shows in the capital cities around Australia.

After the success of his last Australian regional tour of 51 shows from East coast to West, this independent folk musician is pushing the boundaries and expectations of unsigned artists. The Heaven Tour will now see Ziggy performing to 1000’s of his fans in established theatres across the country.

Since releasing ‘Land&Sea’ in 2015, followed by 2016’s ‘Four Feet in The Forest’ - Ziggy’s grassroots following is growing every day with 30 million streams on Spotify alone. Ziggy is set to release his new single ‘Heaven’ on the 15th of September - a taste of whats to come in his new album on its way for 2018.

Old fans, new supporters or curious bystanders - get ready for a fresh experience in Ziggy’s first ever, exclusively seated theatre shows and a farewell to live performance of Land&Sea. 

Tickets selling fast!`,`Ziggy Alberts | QPAC Concert Hall, Brisbane`,`Ziggy Alberts | QPAC Concert Hall, Brisbane`);
this.addEvent(`Jamie MacDowell and Tom Thum | Brisbane Powerhouse`,`Jamie MacDowell and Tom Thum | Brisbane Powerhouse`,`2017-11-30T19:00:00+1000`,`BRISBANE POWERHOUSE`,`One is good with his fingers, the other is good with his mouth.

Beatbox sensation and one-man orchestra, Tom Thum – best known for the most watched TEDx talk of all time – joins forces with bohemian singer-songwriter, Jamie MacDowell, to form a truly unique duo that are “redefining musical parameters” (Nouse).

Armed only with a guitar and a versatile voice box able to convey any instrument, this show eschews cynicism, exudes joy, and defies expectations. A funny, riotous combination of folk-pop songs and virtuosic beat-boxing that just works, even if you can’t work out why.

Be part of an extraordinary eventing of sound with some of the most exciting music makers in the country.

WINNER Best Music Adelaide Fringe 2016

For more information and to book tickets: bit.ly/2gp3i1H`,`Jamie MacDowell and Tom Thum | Brisbane Powerhouse`,`Jamie MacDowell and Tom Thum | Brisbane Powerhouse`);
this.addEvent(`LĪVE - The Reunion World Tour - Brisbane`,`LĪVE - The Reunion World Tour - Brisbane`,`2017-11-15T19:00:00+1000`,`Riverstage`,`The original line-up of +LIVE+ – Ed Kowalczyk (vocals, guitar), Chad Taylor (guitar, backing vocals), Patrick Dahlheimer (bass) and Chad Gracey (drums, percussion) recently reunited for this worldwide tour, bringing their explosive live show to Australia for the first time in over a decade with special guests, Lifehouse (Hanging By a Moment) and The Calling (Wherever You May Go).`,`LĪVE - The Reunion World Tour - Brisbane`,`LĪVE - The Reunion World Tour - Brisbane`);
this.addEvent(`Westfield W-League Round 1 | Sydney FC v Brisbane Roar`,`Westfield W-League Round 1 | Sydney FC v Brisbane Roar`,`2017-10-27T17:20:00+1100`,`Allianz Stadium`,`Match: Sydney FC v Brisbane Roar FC
Date: Friday, 27 October
Venue: Allianz Stadium
Time: 5:20pm AEDT

The Westfield W-League 2017/18 Season kicks off Friday 27 October and You’ve Gotta Have a Team.

And this season, each club will try and convince their grassroots fanbassador why they should choose their team in the Hyundai A-League and Westfield W-League.

It’s going to be an amazing adventure, so to follow each of the teams’ fanbassador journey here at http://youvegottahaveateam.com.au

And don’t forget if you play football and love the game, you’ve gotta have a team. So find your team and show your support throughout the season by using the hashtags:

#YGHAT #ALeague #WLeague`,`Westfield W-League Round 1 | Sydney FC v Brisbane Roar`,`Westfield W-League Round 1 | Sydney FC v Brisbane Roar`);
this.addEvent(`Kathy Griffin: Laugh Your Head Off Tour (Australia)`,`Kathy Griffin: Laugh Your Head Off Tour (Australia)`,`2017-10-19T20:00:00+1100`,`Auckland, Sydney, Melbourne, Brisbane, Perth`,`Armed with the story of the now infamous photo (yes... THAT photo), Kathy Griffin is bringing her 'Laugh Your Head Off' world tour to Australia & New Zealand. 

BRUCE MASON CENTRE, AUCKLAND  THUR OCT 19
SYDNEY OPERA HOUSE                        SAT OCT 21
QPAC, CONCERT HALL, BRISBANE      MON OCT 23
COMEDY THEATRE, MELBOURNE 	FRI OCT 27
ASTOR THEATRE, PERTH			TUES OCT 31

My Live Nation pre-sale: 10am Wednesday, August 30 
Tickets on sale: 10am Friday, September 1`,`Kathy Griffin: Laugh Your Head Off Tour (Australia)`,`Kathy Griffin: Laugh Your Head Off Tour (Australia)`);
this.addEvent(`Rescheduled MEG MAC at The Tivoli, Brisbane`,`Rescheduled MEG MAC at The Tivoli, Brisbane`,`2017-12-15T20:00:00+1000`,`The Tivoli Brisbane`,`MEG MAC’s full Australian tour dates have finally been announced. The previously listed shows at The Enmore Theatre in Sydney and The Forum in Melbourne sold out very quickly. A second show at The Forum has already been announced and is selling out fast. 

MEG MAC’s debut album ‘Low Blows’ released on littleBIGMANrecords on July 14th is a powerful set of dynamic, deep soul, exhortations that have an all-enveloping atmosphere and presence, distinctly and uniquely MEG MAC. It was recorded in Fort Worth, Texas with Niles City Sound who produced and played on Leon Bridges album ‘Coming Home’
https://www.youtube.com/watch?v=oaiJ9czxcoI
 
The recording focused on capturing a great live vocal performance, driven by a dynamic rhythm section and punctuated by her piano. “Overall I wanted it to really feel like I was just singing in the room to you. So a lot of the vocal performances are live and unedited, I think it was important to do that”. “Every song on her debut LP is magnificent”. Idolator USA`,`Rescheduled MEG MAC at The Tivoli, Brisbane`,`Rescheduled MEG MAC at The Tivoli, Brisbane`);
this.addEvent(`The Bennies, The Sugarcanes, The Cutaways - Triffid, Brisbane`,`The Bennies, The Sugarcanes, The Cutaways - Triffid, Brisbane`,`2017-12-16T20:00:00+1000`,`The Triffid`,`pool house records & jackknife music present

THE BENNIES
'Get High Like An Angel' Single Tour
with THE SUGARCANES & THE CUTAWAYS

Saturday December 16
@ The Triffid, Brisbane 
On Sale from - http://thebennies.oztix.com.au/?eventId=79887
Ticket/Album Bundles available from thebennies.lnk.to/naturalbornchillers
--------------------
The Bennies are excited to announce their forthcoming record Natural Born Chillers is out Friday 2 February via Pool House Records / Remote Control. To celebrate, the band have shared first cut 'Get High Like An Angel' which premiered last night on triple j's Good Nights, and have announced a national single tour.

They've also shared their thoughts on this new track - "Single Of The Year." - The Bennies.

Of today's announcement, Pool House Records share: "Today we'd like to give a big, warm welcome to The Bennies to the ever growing Pool House Records family. They're four of the best friends, biggest party animals, most skilful musicians and kindest individuals you could hope to meet, and we're very proud and excited to have the opportunity to release their music!" - Chris Cowburn (Pool House Records / The Smith Street Band). 

It's been a wild time since the release of Wisdom Machine in 2016. The band landed their hit 'Party Machine' at #88 on the triple j Hottest 100, supported heroes The Living End, released a song with Damian Cowell, toured 3 times around Europe, completed a tour of Japan and sold out venues all across Australia. WILD.

They've since swapped jets for studio sweat and Natural Born Chillers was born. The album captures the extreme live energy the band has made a name for itself on, and features some of the most energetic, powerful and quirky songs in The Bennies catalogue to date. Lyrically and sonically it's their most focused and mature work, but still manages to maintain the fun and enthusiasm that has built their fan base worldwide.
 
Recorded with Sam Johnson (The Smith Street Band, The Hard Aches, Camp Cope) the album fuses dozens of genres and is a testament to how the band thrive despite existing completely outside of current musical trends. This is the first record from The Bennies to be released via Pool House Records, The Smith Street Band's label.

Be ready to crack a cold one, The Bennies are soundtracking your summer, performing tracks from Natural Born Chillers on an epic thirteen date national tour this November and December, hitting capital and regional cities across Australia. Enlisting The Sugarcanes and The Cutaways on support, join The Bennies live, at a city near you, and 'Get High Like An Angel.'
 
Pre-order The Bennies - Natural Born Chillers via thebennies.lnk.to/naturalbornchillers`,`The Bennies, The Sugarcanes, The Cutaways - Triffid, Brisbane`,`The Bennies, The Sugarcanes, The Cutaways - Triffid, Brisbane`);
this.addEvent(`Shawn Mendes: Illuminate World Tour | Brisbane`,`Shawn Mendes: Illuminate World Tour | Brisbane`,`2017-11-29T19:00:00+1000`,`Brisbane Entertainment Centre`,`Shawn Mendes
#IlluminateTour

ILLUMINATE WORLD TOUR
Brisbane Entertainment Centre, Brisbane
Wednesday 29 November

FRONTIER MEMBERS PRE-SALE
Begins: Wed 5 Apr (4pm local Brisbane time)
Ends: Thu 6 Apr (4pm local Brisbane time)
(or ends earlier if pre-sale allocation exhausted)
Sign up: frontiertouring.com/signup 

FIRSTACCESS FAN CLUB PRE-SALE
Begins: Fri 31 Mar (4pm local Brisbane time)
Ends: Mon 3 Apr (10pm local Brisbane time)
(or ends earlier if pre-sale allocation exhausted)

OPTUS PRE-SALE
Begins: Tue 4 Apr (2pm local Brisbane time)
Ends: Thu 6 Apr (2pm local Brisbane time)
(or ends earlier if pre-sale allocation exhausted)

FAN CLUB PRE-SALE
Begins: Wed 5 Apr (4pm local Brisbane time)
Ends: Fri 7 Apr (10am local Brisbane time)
(or ends earlier if pre-sale allocation exhausted)

GENERAL PUBLIC ON-SALE
Begins: Fri 7 Apr (12noon local Brisbane time)

TICKETS FROM
ticketek.com.au | Ph: 132 849

For full tour information, visit frontiertouring.com/shawnmendes`,`Shawn Mendes: Illuminate World Tour | Brisbane`,`Shawn Mendes: Illuminate World Tour | Brisbane`);
this.addEvent(`Michael Leunig: Ducks for Dark Times LIVE | Brisbane Powerhouse`,`Michael Leunig: Ducks for Dark Times LIVE | Brisbane Powerhouse`,`2017-11-15T19:15:00+1000`,`BRISBANE POWERHOUSE`,`Australia’s much-loved artist Michael Leunig shares his fondness for cartooning and commentary during this Brisbane-exclusive evening to celebrate the launch of his new book.

Ducks for Dark Times, Leunig’s twentieth collection of cartoons, provides a hilarious and uplifting shot in the arm and a soulful voice of reason in troubling times, from the master of improbable satire and simple expressions of care and hope.

Produced for newspaper publication in response to the news of the day, this collection of more than 120 cartoons uses deft and spirited humour and explores the issues plaguing modern existence.

Ducks for Dark Times is for anyone who is losing faith; who’s becoming exhausted or fed up with the news, and for those of us who feel we could do well to laugh or weep a little more. This collection is a must-have for Michael Leunig fans.

Michael Leunig will be signing copies of his books on the evening courtesy of Riverbend Books.

Writers+Ideas is supported by O’Neill Architecture and RPS.

Wed 15 November, more info here: http://bit.ly/2xbVK5d`,`Michael Leunig: Ducks for Dark Times LIVE | Brisbane Powerhouse`,`Michael Leunig: Ducks for Dark Times LIVE | Brisbane Powerhouse`);
this.addEvent(`Paul McCartney • One On One • Brisbane`,`Paul McCartney • One On One • Brisbane`,`2017-12-09T18:00:00+1000`,`Suncorp Stadium`,`PAUL McCARTNEY
#OneOnOne
Suncorp Stadium, Brisbane (All Ages)

The most successful recording artist of all time, 1 billion records sold worldwide, and multi Grammy award winning artist Paul McCartney will bring his acclaimed One On One tour to Australia and New Zealand this December.

➖

TICKET LIMITS
Frontier Members pre-sale: 4 per purchaser, per show
General public on-sale: 6 per purchaser, per show

Any transactions that exceed the enforced ticket limits may be cancelled. A number of factors are taken into consideration when identifying such transactions, including but not limited to: pre-sale code, credit card details, postal address, email address, purchaser name, ticketing agency log-in information.

➖

VIP PACKAGES 
VIP Packages are available – stay tuned for more info shortly

➖

ACCESSIBILITY TICKETING INFORMATION
Wheelchair seating, companion card and accessibility ticketing details here: http://frntr.co/PMC17AccessibilityTix

➖

TICKETS FROM
Ticketek Australia
http://frntr.co/PaulMcCartneyBRI | Ph: 132 849

Please note: the ticketing agency listed above is the only authorised ticketing agency for this show. Read Frontier Touring’s position on ticket scalping here: http://bit.ly/FTAntiScalpingMsg`,`Paul McCartney • One On One • Brisbane`,`Paul McCartney • One On One • Brisbane`);
this.addEvent(`Melvins with Red Kross at Crowbar, Brisbane (18+)`,`Melvins with Red Kross at Crowbar, Brisbane (18+)`,`2017-11-10T19:00:00+1000`,`Crowbar`,`We're pleased to announce the return of the one and only (the) Melvins to Australia this November, touring their first ever double album A Walk With Love and Death (out now via Ipecac). 

Joining the bill will be legendary LA rockers Redd Kross, making their first visit Down Under in four years.

2nd + final Brisbane show on sale now!

TOUR INFO
frontiertouring.com/melvins`,`Melvins with Red Kross at Crowbar, Brisbane (18+)`,`Melvins with Red Kross at Crowbar, Brisbane (18+)`);
this.addEvent(`San Cisco - The Distance Tour - The Triffid, Brisbane`,`San Cisco - The Distance Tour - The Triffid, Brisbane`,`2017-11-23T19:00:00+1000`,`The Triffid`,`✨THE DISTANCE TOUR✨

San Cisco unleashed their third album, The Water in May featuring the singles 'SloMo' and 'Hey Did I do you wrong?' and now their latest disco infused track 'The Distance'. 

San Cisco continue to tour the world with sell out shows from Sydney to LA to Mexico City to London and Amsterdam.

Join San Cisco for one show only at the Triffid, with very special guest, Ayla.`,`San Cisco - The Distance Tour - The Triffid, Brisbane`,`San Cisco - The Distance Tour - The Triffid, Brisbane`);
this.addEvent(`Ashy Bines Squad Tour - Brisbane`,`Ashy Bines Squad Tour - Brisbane`,`2017-10-21T08:00:00+1000`,`Brisbane, QLD`,`Ashy Bines is forming an exclusive SQUAD in BRISBANE, brought to you by Bondi Sands and The Fitness Show

Join in the world renowned SQUAD workout, in a fun and supportive arena, with ASHY BINES!

“A day I will never forget” @laura_rhodes_
“Met some wonderful people this weekend and had an 
awesome workout” @kbd_fitness
“What an incredible day. Incredible atmosphere and so motivational! So glad we went!” @fitgirlmotivationandhealth

Secure one of the VERY LIMITED spots for the BRISBANE SQUAD TOUR here>>> 
http://www.thesquadtour.com/brisexpo

Sign up through the link to access the tickets - they are likely to sell out so be quick!

Join in on Ashy's favourite 1hr  SQUAD Workout in BRISBANE!
+ Workout with Ashy LIVE, in person
+ Access to the exclusive SQUAD program 
+ Connect with all BRISBANE Squad Tour participants leading up to the event through the SQUAD app
+ FREE tote bag
+ Meet your Squad  Fit Family and connect with new workout buddies!
+ Amazing prizes to win!

Invite your friends and family to this page so they don't miss out on the fun!`,`Ashy Bines Squad Tour - Brisbane`,`Ashy Bines Squad Tour - Brisbane`);
this.addEvent(`Sustainable Wearables - The Pop-Up Shop // Church Brisbane 18+`,`Sustainable Wearables - The Pop-Up Shop // Church Brisbane 18+`,`2017-10-21T15:00:00+1000`,`Church Brisbane`,`The Brisbane Collective presents SUSTAINABLE WEARABLES: The Pop-Up Shop.

The Brisbane Collective, a not-for-profit artist run community are taking over Church Brisbane for a one night only sustainable fashion pop-up shop.

The artist will be creating one-of-a-kind items from upcycled and recycled sustainable wearables including jackets, jeans, shirts, tees, tote bags, badges, patches and anything else you can wear with pride.

After the success of the 'Battle Jackets' exhibition in 2015, they are back - with more opportunities to support local creators and makers - the fashion range will be vast!

Credit cards, EFTPOS and cash accepted.

EXHIBITING ARTISTS:
Harley & Händen
Tara Cosgrave-Perry
Sober Bob
Rachael Anger 
Shani Finch
Bima Perera Illustrations
Moozhan Kheiri
Kimi Schieren
Steven Harris
Emma Le Strange
Anna Elizabeth 
Cronk and Tonic
Katy McHugh
Bella Reboul
Leah Falcocchio
Hacklock
Amy Crow
Samantha Gilkes
Stinkhorns
Epheria
Nooki
Camilla Hine and Kimi Scheirin
Kim Wheeler
Benny Pierce
Slow Motion Collective
Yah Day
Conrad Square

SUSTAINABLE WEARABLES: The Pop-Up Shop by The Brisbane Collective.
Saturday 21st October 2017 (One Night Only) from 3pm - late
Church Brisbane, 243 Brunswick Street, Fortitude Valley
Free Entry / 18+`,`Sustainable Wearables - The Pop-Up Shop // Church Brisbane 18+`,`Sustainable Wearables - The Pop-Up Shop // Church Brisbane 18+`);
this.addEvent(`SIX60 with Nico & Vinz LIVE in Brisbane`,`SIX60 with Nico & Vinz LIVE in Brisbane`,`2018-01-20T19:30:00+1000`,`Eatons Hill Hotel`,`The New Waves World Tour featuring Six60 and Nico & Vinz is hitting Brisbane on Saturday 20th January @ Eatons Hill Hotel and Function Centre 

Tickets on sale this Wednesday at 9am from www.oztix.com.au, this will be another capacity event!`,`SIX60 with Nico & Vinz LIVE in Brisbane`,`SIX60 with Nico & Vinz LIVE in Brisbane`);
this.addEvent(`Thy Art Is Murder - Brisbane`,`Thy Art Is Murder - Brisbane`,`2018-02-18T19:30:00+1000`,`The Triffid`,`Fresh off the back of their sell out Australian tour, heavyweight juggernauts Thy Art Is Murder unleashed their new album Dear Desolation. Not a band to rest on their laurels, they return home early 2018 with an all star lineup featuring Emmure, Fit For An Autopsy and Justice For The Damned.`,`Thy Art Is Murder - Brisbane`,`Thy Art Is Murder - Brisbane`);
this.addEvent(`SHOCKONE 'A Dark Machine' Brisbane`,`SHOCKONE 'A Dark Machine' Brisbane`,`2017-10-20T20:00:00+1000`,`The MET Brisbane`,`ShockOne 'A Dark Machine'
20.10.17 - The Met - Brisbane
w Promnite and featuring Reija Lee
Presented by Falcona & The MET Brisbane

TICKETS ON SALE 9:00AM THURSDAY
http://www.moshtix.com.au/v2/event/shockone-a-dark-machine-tour-w-promnite/98311

#DarkMachine`,`SHOCKONE 'A Dark Machine' Brisbane`,`SHOCKONE 'A Dark Machine' Brisbane`);
this.addEvent(`Ipswich's Biggest Halloween Street Party`,`Ipswich's Biggest Halloween Street Party`,`2017-10-28T16:00:00+1000`,`d'Arcy Doyle Place and Brisbane Street Top of Town Ipswich Central`,`Come and eat your heart out!

Ipswich CBD Food Fair trucks offer flavours from around the world. 

Book a dining experience at one of our delightful restaurants or dine in the street.

Enter the Super Freaks Parade to win super prizes in the best dressed contest. Register at the forecourt of d'Arcy Doyle Place.

Meet the freaky roving characters.

Join in freaky games for kids.

Jumping Castles.

Hell-fire Displays.

DJ, Dancing and Live Entertainment.

Family Friendly and free parking available in The Ipswich City Square Carpark. 

Saturday 28 October
4pm - 9pm 
Free Entry`,`Ipswich's Biggest Halloween Street Party`,`Ipswich's Biggest Halloween Street Party`);
this.addEvent(`Pennywise 'Full Circle' Australian Tour Oct Nov 2017 w The Bronx`,`Pennywise 'Full Circle' Australian Tour Oct Nov 2017 w The Bronx`,`2017-10-27T19:00:00+1100`,`Melbourne, Brisbane, Sydney, Newcastle, Adelaide, Fremantle`,`Pennywise
'Full Circle' 20 Year Annivesary Tour
with special guests The Bronx
October/November 2017

Presented by Destroy All Lines, Chugg Entertainent & Bombshellzine 

Tickets on sale now 
tickets.destroyalllines.com 


_______Click see more for dates and more info_________ 

Dates
Fri 27 Oct – Forum Melbourne 18+
SOLD OUT
with Pagan

Sat 28 Oct, Eatons Hill Hotel, Brisbane – LIC AA
Buy 🎟 http://bit.ly/PWI17bris 
with Driven Fear

Sun 29 Oct  – Enmore Theatre , Sydney - LIC AA
Buy 🎟 http://bit.ly/PWI17sydn
with Beerwolf

Tue 31 Oct – Nex, Newcastle – 18+
Buy 🎟 http://bit.ly/PWI17newc
with R A G E

Thur 2 Nov – HQ Complex , Adelaide – 18+
Buy 🎟 http://bit.ly/PWI17adel
with The Lizards

Friday 3 Nov – Metropolis Fremantle – 18+
Buy 🎟 http://bit.ly/PWI17pert
with Dan Cribb & The Isolated

Sunday 5 Nov @Pier Bandroom – 18+**
Buy 🎟  http://bit.ly/PWI17pier
with Bombs Are Falling & SouthpawHC

**The Bronx Not Appearing 

One of the most defining albums in punk rock history is without a doubt ‘Full Circle’ by PENNYWISE.

2017 sees the 20th anniversary of the exhilarating, inspiring and brilliant album that helped define a genre. ‘Full Circle’ is the emotional and pivotal album that followed the tragic death of founding member and bassist Jason Mathew Thirsk. Dedicated to the memory of Thirsk, ‘Full Circle’ is hard as nails, reflective and ultimately redemptive. 

For the first time in history PENNYWISE will be performing ‘Full Circle’ in its entirety. Australian fans will get to witness one of the most blistering and emotional performances ever by the Hermosa Beach legends.

There is only one other band on the planet worthy enough to join this crushing tour and of course that band is…THE BRONX.  Famous for leaving a trail of exhausted, boozy, sweaty and supremely satisfied bodies in their wake, THE BRONX will be unleashing a reckless level of energy; no barriers, no pause for breath, just a barrage of scuzzy LA punk. Their brand new album ‘V’ will be out September 22.

Watch:
Pennywise - Society 
https://youtu.be/s_B0uXwLCTg
AUS webstore https://artistfirst.com.au/collections/pennywise

The Bronx - Sore Throat 
https://youtu.be/ASt7ZRSWiKo
BRONX ‘V’ is out September 22 on ATO Records. 
Pre-order here: 
http://bronx.lnk.to/brvnx

Links
Site: http://pennywisdom.com/
Facebook: https://www.facebook.com/pennywise
Instagram: http://instagram.com/_pennywise 
Twitter: https://twitter.com/pennywise

http://thebronxxx.com
http://facebook.com/thebronx
http://twitter.com/the_bronx
http://instagram.com/bronxovision
http://atorecords.com`,`Pennywise 'Full Circle' Australian Tour Oct Nov 2017 w The Bronx`,`Pennywise 'Full Circle' Australian Tour Oct Nov 2017 w The Bronx`);
this.addEvent(`What Should I Eat? -Brisbane`,`What Should I Eat? -Brisbane`,`2017-10-22T11:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`We need good nourishing food now more than ever. And we need a clear, concise message about what’s best for us.

Join health and fitness personalities and authors Michelle Bridges, David Gillespie, Ellie Bullen and Tim Robards as they spark a conversation about one of the most important health issues of our time – the role of food in overall wellbeing.

We will talk about all of the subjects that press people’s buttons and ask all important questions like:
– how has the health and wellness industry become so prolific?
– how do you sift through all the noise and know who to listen to?
– what’s just hype and what’s science?
– what messages are downright dangerous?

You’ll also get the opportunity to ask our incredible panel your own questions, have a photo and get your books signed after the event!

BOOKINGS ARE REQUIRED! BOOK NOW: http://bit.ly/b-wsie`,`What Should I Eat? -Brisbane`,`What Should I Eat? -Brisbane`);
this.addEvent(`SOLD OUT Something for Kate at The Triffid, Brisbane`,`SOLD OUT Something for Kate at The Triffid, Brisbane`,`2017-11-11T19:00:00+1000`,`The Triffid`,`Something For Kate bring their Spring 2017 Tour to Brisbane's The Triffid. This show is sold out. Special Guests, Slowly Slowly`,`SOLD OUT Something for Kate at The Triffid, Brisbane`,`SOLD OUT Something for Kate at The Triffid, Brisbane`);
this.addEvent(`Rising Waters Interactive Horror Experience Brisbane`,`Rising Waters Interactive Horror Experience Brisbane`,`2018-01-11T19:30:00+1000`,`Brisbane, QLD`,`Hunted Interactive Experience Presents RISING WATERS 

On a dark night in 2013, a little girl was lured down to the water side of a murky lake and murdered. Something happened in the shadows and mists that terrible night, something that changed the lake forever, marking it as...wrong. Sick. 

A haven for cruelty and twisted desires. 

Now, four years later, a new horror emerges. 

Carson likes Tinder. He uses it a lot, to meet women of all kinds. He considers himself a true devotee of romance. A student of human nature, seeking to find what is beautiful and intriguing in all the women he meets.

The ones he finds the most fascinating are the ones who live alone. 

Who have no one to come looking for them. 

Who won't be missed. 

Maybe they'll be more motivated. Maybe they'll take more risks. 

Like coming to a dark lakeside at night to meet a handsome stranger. 

Him, and his shotgun...

You find yourself in the midst of a gruesome chase, where Carson sets his hapless victims running for their lives, then hunts them like fleeing deer. But not everything is as it seems. The spirits of Carson's victims remain, trapped in the dark aura of the lake. 

And now, they greatly out-number him. As large and dark as his presence may be, the combined strength of many murdered women is a rising tide of rage. 

Now, they want vengeance. 

But nothing in this cursed place is pure or good...

Only for audiences 15 and over, the performance is designed to be genuinely scary. 

This is a walk- around performance, where small groups move through the story at a time. Audience groups encounter actors spaced throughout the performance area who construct the story around and including them.

WHEN  - Thu 11th Jan - 8pm, 8.45pm, 9.30pm, 10.15pm
             - Fri 12th Jan - 8pm, 8.45pm, 9.30pm, 10.15pm
             - Sat 13th Jan - 8pm, 8.45pm, 9.30pm, 10.15pm
             - Thu 11th Jan - 8pm, 8.45pm, 9.30pm, 10.15pm
             - Fri 12th Jan - 8pm, 8.45pm, 9.30pm, 10.15pm
             - Sat 13th Jan - 8pm, 8.45pm, 9.30pm, 10.15pm

WHERE - AT A SECRET LOCATION IN METROPOLITAN BRISBANE

You will receive a location map via email along with your tickets. 

Please read our F.A.Q. here : http://www.interactivehorrorexperience.com/faq-1

PLEASE NOTE: AUDIENCE NUMBERS ARE STRICTLY LIMITED! 
BOOK EARLY - WE SELL OUT FAST! 

*TICKET PRICES & OPTIONS* 

- DOUBLE FEATURE - See both DARK LAKE and the brand new sequel, RISING WATERS at a great discount price with our new Double Feature ticket! Book your shows for the dates you want and save yourself a full $20 off the price of your tickets! - DOUBLE FEATURE ONLY $59.90 

- RISING WATERS LAUNCH TICKETS - $29.90 for the FIRST TEN TICKETS ON EACH DATE ONLY! Be amongst the first to book DARK LAKE and save $10 off the regular purchase price! 

- Adults - $39.90 
- Concession - $35.90 (Students, Health Care Cards, Seniors)
- Group Discount (MINIMUM 6) - $34.90 

Click the link to go straight to our online ticket shop now : 

https://www.huntedexperience.com/ticket-shop-1/BRISBANE-TICKETS-c25049298`,`Rising Waters Interactive Horror Experience Brisbane`,`Rising Waters Interactive Horror Experience Brisbane`);
this.addEvent(`Royal Blood at Riverstage, Brisbane (Lic. All Ages)`,`Royal Blood at Riverstage, Brisbane (Lic. All Ages)`,`2018-05-07T19:00:00+1000`,`Riverstage`,`Fresh from their sold out Sydney show and headline slot at Splendour In The Grass, Royal Blood will be returning to Australia and New Zealand next April and May to play their biggest venues on our shores to date.

FRONTIER MEMBERS PRE-SALE
Begins: Wed 26 Jul (2pm AEST)
Ends: Thu 27 Jul (2pm AEST)
(or ends earlier if pre-sale allocation exhausted)

Sign up here: frontiertouring.com/signup

GENERAL PUBLIC ON-SALE
Begins: Wed 2 Aug (10am local time)

TOUR INFO
frontiertouring.com/royalblood`,`Royal Blood at Riverstage, Brisbane (Lic. All Ages)`,`Royal Blood at Riverstage, Brisbane (Lic. All Ages)`);
this.addEvent(`The Dillinger Escape Plan - Final Australian Tour October 2017`,`The Dillinger Escape Plan - Final Australian Tour October 2017`,`2017-10-15T19:00:00+1100`,`Perth, Adelaide, Melbourne, Sydney, Brisbane`,`The Dillinger Escape Plan 
Final Ever Austalian Tour 
October 2017
Presented by Destroy All Lines, Chugg Entertainment and THE RACKET

Tickets on sale NOW  via tickets.destroyalllines.com 

dillingerescapeplan.org  |  facebook.com/dillingerescapeplan {  twitter.com/TDEP_   

________Click see more for dates and more info_________

Dates:
Presented by Southern Extremeties Productions 
Friday October 13 - Odeon Theatre, Hobart  Lic AA 
🎟️ http://bit.ly/DEP17hobt
--------
Sunday 15 October – Capitol, Perth 18+
🎟️ http://bit.ly/DEP17pert
with Förstöra 

Tuesday 17 October – Fowlers Live, Adelaide 18+
🎟️  http://bit.ly/DEP17adle / http://bit.ly/DEP17adel
with Lonelyspeck

Wednesday 18 October – The Bald Faced Stag, Sydney 18+
‼️ SOLD OUT ‼️
with  Totally Unicorn 

Thursday 19 October – Corner Hotel, Melbourne 18+
‼️ SOLD OUT ‼️
with Closure In Moscow

Friday 20 October – Corner Hotel, Melbourne 18+
‼️ SOLD OUT ‼️
with Closure In Moscow

Saturday 21 October – The Metro Theatre, Sydney 18+
‼️ SOLD OUT ‼️
with Closure In Moscow

Sunday 22 October – Max Watt's House of Music, Brisbane 18+
🎟️ http://bit.ly/DEP17bris 
with Closure In Moscow

Don't cry because THE DILLINGER ESCAPE PLAN are calling it a day; smile because they've somehow managed to stay alive this long and that you’ll get one last chance to witness them live.

After twenty years of defying expectation, pushing the boundaries of their compositions, and performances beyond what might seem possible or even reasonable, THE DILLINGER ESCAPE PLAN announced that they would be quitting after they complete the touring cycle for their new record ‘Dissociation’. So for Australian fans this is our swansong.

Live reviews are coming in thick and fast from across the globe and they all are sharing a common theme...you simply cannot miss these shows from the recklessly experimental, titans of the metal world, and one of the standout bands of their generation; THE DILLINGER ESCAPE PLAN.

“The band and fans were as one as the crowd sang along, moshed and crowd surfed as they fed off the intense energy of the band. It was intense, enjoyable and bittersweet.” – Metal Wani

“For a full 90 minutes THE DILLINGER ESCAPE PLAN rattle the skulls of all assembled, leaving an exhausted crowd baying for more. What better way to go out.” – The Buzz

“Dillinger gave the audience few moments to relax, bombarding them persistently with fast and intense chaos.” – Exclaim Mag

“The experience was absolutely nostalgic. It was hard not to remember when and where you first heard every one of their songs as you screamed along.” – Music and Riots Mag

“You should make it a point to see one of the most powerful live acts in heavy music.” – Read Junk

“This was a night for the fans to come together and celebrate one of the most important bands of our generation, and they proved, once again, why they will go down as one of the greatest live acts ever.”– Ghost Cult Mag

“The dampened, exhausted audience shot their hands up and jumped in solidarity, their capacity to mosh long since depleted. They could only watch in awestruck wonder as the book closed on one of modern metal’s finest acts, still at the peak of its power.” – Austin Chronicle

“Chaotic insanity in a bottle, after being shaken up and the cork popped.” – Louder Than War

The set will encompass songs spanning their incredible career showcasing music from all albums. Tickets go on sale Friday 21 April, 9am local.`,`The Dillinger Escape Plan - Final Australian Tour October 2017`,`The Dillinger Escape Plan - Final Australian Tour October 2017`);
this.addEvent(`Rise Against with SWMRS at Riverstage, Brisbane`,`Rise Against with SWMRS at Riverstage, Brisbane`,`2018-02-14T19:00:00+1000`,`Riverstage`,`Rise Against will return to rock Australia and New Zealand in February 2018, joined by special guests SWMRS. 

The politically-charged, punk four-piece will play seven shows – their biggest headline shows in our countries to date – in celebration of their chart-topping eighth studio album Wolves.

FRONTIER MEMBERS PRE-SALE
Begins: Thu 13 Jul (12noon AEST)
Ends: Fri 14 Jul (12noon AEST)
(or ends earlier if pre-sale allocation exhausted)

Sign up: frontiertouring.com/signup

GENERAL PUBLIC ON-SALE
Begins: Mon 17 Jul (10am local time)

FULL TOUR INFO
frontiertouring.com/riseagainst`,`Rise Against with SWMRS at Riverstage, Brisbane`,`Rise Against with SWMRS at Riverstage, Brisbane`);
this.addEvent(`Robbie Williams Heavy Entertainment Show in Brisbane`,`Robbie Williams Heavy Entertainment Show in Brisbane`,`2018-02-20T19:00:00+1000`,`Brisbane Entertainment Centre`,`Global pop phenomenon, ROBBIE WILLIAMS will bring his mammoth Heavy Entertainment Show World Tour to Australia in February and March. 
	
“The heavy entertainment show,” explains Williams, “is every single moment on earth – we’re all part of the heavy entertainment show.”

Opening to rave reviews across Europe, The Heavy Entertainment Show Australian Tour will see Williams perform a glittering hit-laden set spanning his entire career, along with a couple of surprising covers thrown in for good measure. 

From his breakthrough global smash hit ‘Angels’, through pop anthems ‘Let Me Entertain You’, ’Millennium’, 'Come Undone', 'Kids', 'Feel' ‘Rock DJ’, and more, Robbie Williams’ unparalleled catalogue is a career-defining generational soundtrack. 

“… his set was a jubilant journey through a life in pop… the perfect stadium singalong from pop’s ultimate entertainer”. – The Standard UK 

“… the night belonged to Robbie, who brought the house down with his showmanship and stage presence… fans spilled out onto Lansdowne Road knowing they had just witnessed a born entertainer do his thing on the big stage.” – Dublin Live 

Williams is without doubt one of the most acclaimed and charismatic live performers of his times, a position that was cemented and celebrated by his record-breaking 2003 Knebworth performances over three nights in front of 375,000 people. 

As a solo artist, Williams has sold over 77 million albums, and has six of the top 100 best-selling albums in British history. He has chalked up 14 number one singles and has claimed a whopping 18 Brit Awards, which is double that of any other artist.

Williams last toured Australia in 2015, when he wowed local audiences with his epic Let Me Entertain You Tour, which saw him perform countless sold out arena shows around the country. Of that tour, the Herald Sun wrote, “Robbie Williams is the most entertaining male pop star of his generation… His charismatic mixture of American Brat Pack with British old-school theatre and pantomime helps him effortlessly charm the arena in an instant.”`,`Robbie Williams Heavy Entertainment Show in Brisbane`,`Robbie Williams Heavy Entertainment Show in Brisbane`);
this.addEvent(`Katy Perry - Witness: The Tour`,`Katy Perry - Witness: The Tour`,`2018-08-08T19:00:00+1000`,`Brisbane Entertainment Centre`,`ON SALE NOW: http://bit.ly/KatyPerryAU

TEG DAINTY announced that MYER will present global pop superstar KATY PERRY’s WITNESS: The Tour, which will come to Australia next July and August in support of her new album Witness.

WITNESS: The Tour 2018 National Dates:
• PERTH: 24 July at Perth Arena
• ADELAIDE: 30 & 31 July at Adelaide Entertainment Centre
• MELBOURNE: 2 & 3 August at Rod Laver Arena
• BRISBANE: 8 & 10 August at Brisbane Entertainment Centre
• SYDNEY: 13 & 14 August at Qudos Bank Arena

All tour details at tegdainty.com`,`Katy Perry - Witness: The Tour`,`Katy Perry - Witness: The Tour`);
this.addEvent(`Raising Children Who Shine Conference, Brisbane`,`Raising Children Who Shine Conference, Brisbane`,`2018-03-17T08:50:00+1000`,`Brisbane Convention & Exhibition Centre`,`Four leading experts from Australia and overseas unpack some of the key challenges facing parents and people who work with children today. 

Exploring Childhood from Toddlers to 10-year-olds
for parents, carers and educators

Featuring one of Australia's favourite parenting authors Maggie Dent alongside Dr Vanessa LaPointe (from Canada, author of "Discipline Without Damage"), Dr Kristy Goodwin (author of "Raising Your Child in a Digital World") & Dr Justin Coulson (Kidspot parenting expert & author of "21 Days to a Happier Family").

Exploring issues that really challenge families (and make education and learning a challenge) like:
** Disciplining your kids without damaging them for life
** Making the transition to school successfully (especially for boys)
** Helping kids with self-regulation
** Using technology in a healthy way – and stopping the fights!
** Getting kids to listen (so you can stop yelling)
 … and so much more. 

Please check out our conference website to read more about the event and the speakers and to take advantage of our 
EARLY BIRD TICKETING 
& PAYMENT PLAN OPTIONS*. 

CONFERENCE WEBSITE:
http://www.maggiedent.com/raising-children-who-shine

LOGISTICS:
- Tickets are general allocation so you may sit where you like. 
- Babes in arms are welcome.
- A delicious morning tea and lunch are included in the ticket price, as well as a conference handout and a downloadable bundle of resources.

TICKET PRICE INCLUDES:
- full-day conference
- delicious, nutritious morning tea and lunch
- conference handout
- access to a downloadable bundle of resources (eBooks and Audio tracks) from www.maggiedent.com worth up to $60.

OUR EDUCATIONAL PARTNER
We are delighted to have the Australian Childcare Alliance supporting this event as our educational partner. It’s a fantastic chance for the most important people in our children’s lives – their parents and the people who care for and educate them – to come together in one room and explore how to help them shine.

*EARLY BIRD & PAYMENT PLANS MUST BE BOOKED BY 15TH DECEMBER.`,`Raising Children Who Shine Conference, Brisbane`,`Raising Children Who Shine Conference, Brisbane`);
this.addEvent(`Meg Mac`,`Meg Mac`,`2017-12-15T19:00:00+1000`,`The Tivoli Brisbane`,`MEG MAC's full Australian tour dates have finally been announced. The previously listed shows at The Enmore Theatre in Sydney and The Forum in Melbourne sold out very quickly. A second show at The Forum has already been announced and is selling out fast. MEG MAC's debut album 'Low Blows' released on littleBIGMANrecords on July 14th is a powerful set of dynamic, deep soul, exhortations that have an all-enveloping atmosphere and presence, distinctly and uniquely MEG MAC. 
Sale Dates and Times:

Public Onsale : Mon, 3 Jul 2017 at 01:30 PM`,`Meg Mac`,`Meg Mac`);
this.addEvent(`TODAY!!! Vote YES - Rally for Marriage Equality Brisbane`,`TODAY!!! Vote YES - Rally for Marriage Equality Brisbane`,`2017-10-21T13:00:00+1000`,`Queens Gardens (cnr George and Elizabeth St) Brisbane City`,`September 10th saw the biggest rally for LBGTI rights in QLD's history!
10,000 people took to the streets with a simple message 'VOTE YES'


Millions have already voted,  but millions more still have to post their ballot!

It's obvious, even to the NO side that we are going to win the vote! (YASSS) but that doesn't mean we win marriage equality. 

The legislation still has to pass the parliament, and we know we can't sit back and put our faith in the politicians. 

Some Liberals are now proposing 'religious freedoms' bills that will grant sweeping rights to business and religious institutions to discriminate against LGBTI people. 

So we can't think this is over because we posted our ballot.  We have to keep up the strength and momentum of our side.

This rally is part of national rallies happening all across the country next weekend.  

Hope to see you all there!!!

Get Sharing and Invting`,`TODAY!!! Vote YES - Rally for Marriage Equality Brisbane`,`TODAY!!! Vote YES - Rally for Marriage Equality Brisbane`);
this.addEvent(`Bruno Mars: 24k Magic Australia/New Zealand tour 2018`,`Bruno Mars: 24k Magic Australia/New Zealand tour 2018`,`2018-02-27T19:30:00+1100`,`Auckland, Melbourne, Brisbane, Sydney, Adelaide, Perth`,`Grammy Award winner and world-renowned, multi-platinum selling singer/songwriter/producer/director/musician, BRUNO MARS is set to return to New Zealand and Australia next February and March as part his 24K Magic World Tour.

TOUR DETAILS: http://lvna.co/BMARS24K

TOUR DATES:
AUCKLAND, SPARK ARENA TUESDAY FEBRUARY 27  
AUCKLAND, SPARK ARENA WEDNESDAY FEBRUARY 28
AUCKLAND, SPARK ARENA FRIDAY MARCH 2
AUCKLAND, SPARK ARENA SATURDAY MARCH 3
MELBOURNE, ROD LAVER ARENA WEDNESDAY MARCH 7
MELBOURNE, ROD LAVER ARENA THURSDAY MARCH 8
MELBOURNE, ROD LAVER ARENA SATURDAY MARCH 10
MELBOURNE, ROD LAVER ARENA SUNDAY MARH 11
BRISBANE ENTERTAINMENT CENTRE WEDNESDAY MARCH 14
SYDNEY, QUDOS BANK ARENA SATURDAY MARCH 17 
SYDNEY, QUDOS BANK ARENA SUNDAY MARCH 18
SYDNEY, QUDOS BANK ARENA TUESDAY MARCH 20
ADELAIDE ENTERTAINMENT CENTRE MONDAY MARCH 26
PERTH ARENA WEDNESDAY MARCH 28

Please check the tour details for your cities on sale time!`,`Bruno Mars: 24k Magic Australia/New Zealand tour 2018`,`Bruno Mars: 24k Magic Australia/New Zealand tour 2018`);

	}

}

export default new Store();