# PoE-Trade-Discord-Bot

PoE Trade Discord Bot is a Discord bot that will provide the current value of any non-rare armour/weapon item. This innformation is obtained using the poe.ninja API.

Currently very early in development, current implementations include:
- Pricing for any easily pricable item, such as:
  - Any currency, fragment, or non modifiable items (i.e. Unique gear pieces, oils, catalysts, etc.)
  - No pricing is planned for rare items, due to no truly accurate way of pricing rare rarity gear. (Consistently depends on market, meta builds, modifiers, etc.)
- Storage of historical pricing data from the poe.ninja API.
  
Planned implementations include:
- Plan to work on a more sophisticated database for this data, it's currently being stored in local JSON files for testing purposes (each day pulls tens of thousands of JSON 'items').
- An efficient algorithm to search and retrieve items from the database quicker.
- Price trend analysis, seeing how an items price, or general currency value, is changing throughout multiple leagues, and within a league.
- Easier to use search functionality. For example searching 'shavronnes wrappings' would bring up no search result, since the item is named "shavronne's wrappings".
- Better display of data within the bots response.

This product isn't affiliated with or endorsed by Grinding Gear Games in any way.