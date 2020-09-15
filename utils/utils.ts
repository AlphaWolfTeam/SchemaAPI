import menash, { ConsumerMessage } from 'menashmq';

export const initRabbit = async () => {
    // get ip and queue name from config
    await menash.connect('amqp://localhost:5672');
    await menash.declareQueue('queue-name');
}

export const sendDataToRabbit = async (data: ConsumerMessage) => {
    return menash.send('queue-name', data);
}

export const receiveDataFromRabbit = (msg: ConsumerMessage) => {
    const data = msg.getContent();
    console.log(data);
    msg.ack();
}

// const main = async() => {
//     await initRabbit();
//     await menash.queue('instances-queue').activateConsumer(receiveDataFromRabbit: ConsumerMessage);
// }

// const main = async() => {
//     await initRabbit();
// }
