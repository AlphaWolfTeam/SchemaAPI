import menash from 'menashmq';

export const initRabbit = async () => {
    // get ip and queue name from config
    await menash.connect('amqp://localhost:5672');
    await menash.declareQueue('queue-name');
}

export const sendDataToRabbit = async (data) => {
    return menash.send('queue-name', data);
}

export const receiveDataFromRabbit = (msg) => {
    const data = msg.getContent();
    console.log(data);
    msg.ack();
}

// const main = async() => {
//     await initRabbit();
//     await menash.queue('instances-queue').activateConsumer(receiveDataFromRabbit);
// }

// const main = async() => {
//     await initRabbit();
// }
