import _ from 'lodash';
import { action, computed, observable } from 'mobx';
import Event from './event'

class Store {
	@observable events = [];
	@observable loaded = false;

	constructor() {
	  this._initialEventPopulate();
	  this._fbEventPopulate();
	}

	@action _initialEventPopulate() {
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
		return this.events.filter(event =>
			!user.eventsSeen.includes(event.key) &&
			event.created_by != user.id &&
			event.tags.some(r=> user.tagSet.has(r)));
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
this.addEvent(`Brisbane Encore Shows`,`Brisbane Encore Shows`,`2017-10-20T19:00:00+1000`,`The Paddo`,`EXTRA SHOW ADDED! Back by popular demand. Troy Kinne is doing three more Encore performances of his sell out live show. 
Fri Oct 20 (sold out), Sat Oct 21 (sold out) and Sun Oct 22`,`Brisbane Encore Shows`,`Brisbane Encore Shows`);
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
this.addEvent(`Total solar eclipse in Brisbane, Australia`,`Total solar eclipse in Brisbane, Australia`,`2037-07-13T11:40:00+1000`,`Brisbane`,`"O dark, dark, dark, amid the blaze of noon,
Irrecoverábly dark, total eclipse
Without all hope of day!" - John Milton

The upcoming Total Solar Eclipse will be visible very soon. Make sure you have your eclipse glasses ready!

If you're in the city (specifically the GPO), the eclipse will start at 11:42:11. Totality will begin at 13:16:24 and finish at 13:17:31.

Totality will not be visible in parts of the northside. Your best bet is to watch the eclipse on the southside (or go on a road trip to Byron Bay).

Please remember to share this event and invite your friends :)

This NASA link will give you more info:

http://eclipse.gsfc.nasa.gov/SEgoogle/SEgoogle2001/SE2037Jul13Tgoogle.html`,`Total solar eclipse in Brisbane, Australia`,`Total solar eclipse in Brisbane, Australia`);
this.addEvent(`Carl Cox & Eric Powell, Incognito Live`,`Carl Cox & Eric Powell, Incognito Live`,`2017-10-28T13:00:00+1000`,`Brisbane Botanic Gardens, Mount Coot-tha`,`https://www.residentadvisor.net/events/1005379`,`Carl Cox & Eric Powell, Incognito Live`,`Carl Cox & Eric Powell, Incognito Live`);
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
this.addEvent(`Drake | Brisbane`,`Drake | Brisbane`,`2017-11-10T20:00:00+1000`,`Brisbane Entertainment Centre`,`Drake Announces Australian Tour Dates!

The multiple Grammy Award-winning Canadian will arrive in New Zealand for a show on November 3 before playing back-to-back shows in Sydney (7 and 8), one night in Brisbane (November 10) and two nights in Melbourne (18 and 20).

Tickets go onsale at Friday 15 September, 1pm, here:
► http://tidd.ly/5fec5a29`,`Drake | Brisbane`,`Drake | Brisbane`);
this.addEvent(`Lorde | Brisbane`,`Lorde | Brisbane`,`2017-11-23T19:00:00+1000`,`Riverstage`,`Lorde announces world tour including New Zealand and Australia dates!

Lorde has announced details of a world tour in support of her upcoming album ‘Melodrama’.

Ella Yelich-O’Connor will release her long-awaited second album ‘Melodrama‘ on June 16. She has already shared three songs from it – ‘Green Light‘, ‘Perfect Places’ and ‘Liability‘ – while she has also performed another new track, ‘Homemade Dynamite‘, live.

Get your tickets, here:
➢ http://tidd.ly/3557229c`,`Lorde | Brisbane`,`Lorde | Brisbane`);
this.addEvent(`Brisbane Freddy Pop-up Store - 2 Days only!`,`Brisbane Freddy Pop-up Store - 2 Days only!`,`2017-10-21T09:00:00+1000`,`Brisbane Convention & Exhibition Centre`,`Brisbane gals it has been too long, but we are coming back, bigger & better than ever - with EXCLUSIVE OFFERS - so get ready! 

The FREDDY POP-UP Store will be at the Brisbane Fitness Show 2017! We will have an extended range from our Fashion, Denim & Sportswear collections including our latest styles plus EXCLUSIVE Fitness Show offers! 

WHERE: Booth #F18 - Brisbane Convention & Exhibition Centre (Inside the Fitness Show 2017)
WHEN: 21st - 22nd October 2017
TIME: 9am - 5pm

If you have always wanted a pair of FREDDY pants but want to try them first or need to add to your collection, you cannot miss this!! 

Get fitted into the perfect pair of FREDDY's by one of our highly trained team in one of our 5 fitting rooms, discover new styles and colours AND get more for less with EXCLUSIVE SHOW OFFERS!

Browse the range now at www.freddystore.com.au
RSVP NOW and receive 20% off tickets when you pre-book online (Use code EXH) - http://bit.ly/2y95GBd`,`Brisbane Freddy Pop-up Store - 2 Days only!`,`Brisbane Freddy Pop-up Store - 2 Days only!`);

}

}

export default new Store();