const request = require("request");
const path = require("path");
const chalk = require("chalk");

console.log(
    chalk.red(`
  ╔╦╗╔═╗╦═╗╦╔═    ╦ ╦╔╦╗╦╦  ╦╔╦╗╦╔═╗╔═╗
   ║║╠═╣╠╦╝╠╩╗    ║ ║ ║ ║║  ║ ║ ║║╣ ╚═╗
  ═╩╝╩ ╩╩╚═╩ ╩    ╚═╝ ╩ ╩╩═╝╩ ╩ ╩╚═╝╚═╝
       The power on your side
`),
);

class Main {
    static formatConsoleDate(date) {
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var milliseconds = date.getMilliseconds();

        return (
            "[" +
            (hour < 10 ? "0" + hour : hour) +
            ":" +
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds) +
            "." +
            ("00" + milliseconds).slice(-3) +
            "] "
        );
    }

    static GetArgs() {
        return process.argv.slice(2);
    }
}

class Discord {
    static DeleteWebhook(url) {
        return new Promise(function (resolve, reject) {
            request.delete(
                url,
                function optionalCallback(err, httpResponse, body) {
                    try {
                        if (body.includes("Unknown Webhook")) {
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    } catch {
                        resolve(false);
                    }
                },
            );
        });
    }
}

if (Main.GetArgs().length < 1) {
    console.log(`${chalk.red("[ERROR]")} bad command usage

        ${chalk.yellow("Usage Sheme:")}
            - user@some_name:~# node ${path.basename(__filename)} <webhook-url>
    `);
    process.exit(0);
}

Discord.DeleteWebhook(Main.GetArgs()[0]).then((response) => {
    if (response) {
        console.log(
            chalk.hex("#d6af42")(Main.formatConsoleDate(new Date())) +
                chalk.green("Webhook successfully deleted !"),
        );
    } else {
        console.log(
            chalk.hex("#d6af42")(Main.formatConsoleDate(new Date())) +
                chalk.red("Webhook does not exist ..."),
        );
    }
});
