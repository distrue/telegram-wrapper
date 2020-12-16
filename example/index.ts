import {connectBot} from '../dist';


const main = async () => {
  const token = "inserttoken";
  const item = connectBot(token);
  const data = await item.getUpdates();
  data.map((it: any) => {
    console.log(it.message);
  });
  console.log(await item.sendMessage(1453456398, "test 알림"));
}

main();
