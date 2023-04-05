const password = "Temp123" //CHANGEME
const ip = "192.168.0.100" //CHANGEME
const port = "28016" //CHANGEME

const ws = new WebSocket("ws://" + ip + ":" + port + "/" + password)

const idMain = document.getElementById("main")
const idConsole = document.getElementById("console")
const idInput = document.getElementById("input")

idInput.addEventListener("keypress",(e) =>
{
	if(e.keyCode == 13)
	{
		ws.send(JSON.stringify({ Message: idInput.value }))

		idInput.value = ""
	}
	else
	{
		return false
	}
})

setInterval(() =>
{
        ws.send(JSON.stringify({ Message: "status" }))
},120000)

ws.onmessage = (e) =>
{
	justDoIt(e)
}

ws.onopen = (e) =>
{
	ws.send(JSON.stringify({ Message: "status" }))
}

ws.onerror = (e) =>
{
	console.log("error",e)
}

ws.onclose = (e) =>
{
	console.log("close",e)
}

async function justDoIt(e)
{
	if(e.isTrusted)
	{
		let getElement = await e.data
		let parse = JSON.parse(getElement)
		let msg = parse.Message

		idConsole.innerText += msg + "\n"

		idConsole.scrollTop = idConsole.scrollHeight
	}
	else
	{
		return false
	}
}
