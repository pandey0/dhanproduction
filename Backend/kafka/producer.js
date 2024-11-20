const kafka = require("kafka-node");
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(client);

producer.on("ready", () => {
  console.log("Kafka Producer is connected and ready.");
});

producer.on("error", (error) => {
  console.error("Kafka Producer error:", error);
});

function sendTransactionEvent(transaction) {
  const payload = [
    { 
      topic: "transaction_events", 
      messages: JSON.stringify(transaction),
      partition: 0
    }
  ];
  producer.send(payload, (error, data) => {
    if (error) {
      console.error("Error sending transaction event to Kafka:", error);
    } else {
      console.log("Transaction event sent to Kafka:", data);
    }
  });
}

module.exports = { sendTransactionEvent };
