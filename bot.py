from pyrogram import Client, filters
from config import Config
from database import db

bot = Client("filter_bot", api_id=Config.API_ID, api_hash=Config.API_HASH, bot_token=Config.BOT_TOKEN)

@bot.on_message(filters.command("start"))
async def start(client, message):
    await message.reply("Hello! I am your new Auto Filter Bot. Add me to your channel/group!")

@bot.on_message(filters.text & ~filters.command(["start"]))
async def filter_query(client, message):
    query = message.text
    files = await db.find_file(query)
    if files:
        for f in files:
            await message.reply(f"Found: {f['name']}")
    else:
        await message.reply("No files found.")

bot.run()
