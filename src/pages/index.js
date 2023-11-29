import { Web5 } from "@web5/api";
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'

export default function Home() {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [recipientDid, setRecipientDid] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageType, setMessageType] = useState('Secret');
  const [submitStatus, setSubmitStatus] = useState('');
  const [didCopied, setDidCopied] = useState(false);


  useEffect(() => {

  }, []);


  const queryLocalProtocol = async (web5) => {
  };


  const queryRemoteProtocol = async (web5, did) => {
  };

  const installLocalProtocol = async (web5, protocolDefinition) => {
  };

  const installRemoteProtocol = async (web5, did, protocolDefinition) => {
  };

  const defineNewProtocol = () => {
  };


  const configureProtocol = async (web5, did) => {
  };


  const writeToDwnSecretMessage = async (messageObj) => {
  };

  const writeToDwnDirectMessage = async (messageObj) => {
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting message...');
    setSubmitStatus('Submitting...');

    try {
      const targetDid = messageType === 'Direct' ? recipientDid : myDid;
      let messageObj;
      let record;

      if (messageType === 'Direct') {
        console.log('Sending direct message...');
        messageObj = constructDirectMessage(recipientDid);
        record = await writeToDwnDirectMessage(messageObj);
      } else {
        messageObj = constructSecretMessage();
        record = await writeToDwnSecretMessage(messageObj);
      }

      if (record) {
        const { status } = await record.send(targetDid);
        console.log("Send record status in handleSubmit", status);
        setSubmitStatus('Message submitted successfully');
        await fetchMessages();
      } else {
        throw new Error('Failed to create record');
      }

      setMessage('');
      setImageUrl('');
    } catch (error) {
      console.error('Error in handleSubmit', error);
      setSubmitStatus('Error submitting message: ' + error.message);
    }
  };

  const constructDirectMessage = (recipientDid) => {

  };

  const constructSecretMessage = () => {

  };

  const fetchUserMessages = async () => {
  };

  const fetchDirectMessages = async () => {
  };

  const fetchMessages = async () => {
    const userMessages = await fetchUserMessages();
    const directMessages = await fetchDirectMessages();
    const allMessages = [...(userMessages || []), ...(directMessages || [])];
    setMessages(allMessages);
  };


  const handleCopyDid = async () => {
  };

  const deleteMessage = async (recordId) => {
  };


  return (
    <div>
      <div className={styles.header}>
        <div className={styles.avatar}>CB</div>
        <h1 className={styles.title}>ChatBox</h1>
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <textarea
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your secret message here"
          />
          <input
            className={styles.input}
            type="text"
            placeholder="Enter image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <select
            className={styles.select}
            value={messageType}
            onChange={(e) => setMessageType(e.target.value)}
          >
            <option value="Secret">Secret</option>
            <option value="Direct">Direct</option>
          </select>
          {messageType === 'Direct' && (
            <input
              className={styles.input}
              type="text"
              value={recipientDid}
              onChange={e => setRecipientDid(e.target.value)}
              placeholder="Enter recipient's DID"
            />
          )}
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">Submit Message</button>
            <button className={styles.secondaryButton} type="button" onClick={fetchMessages}>Refresh Messages</button>
            <button className={styles.secondaryButton} type="button" onClick={handleCopyDid}>Copy DID</button>
          </div>
        </form>
        {didCopied && <p className={styles.alertText}>DID copied to clipboard!</p>}
      </div>
      {messages.map((message, index) => (
        <div key={index} className={styles.container}>
          <div className={styles.field}>
            <div className={styles.fieldName}>From:</div>
            <div className={styles.didContainer}>{message.sender}</div>
          </div>
          <div className={styles.field}>
            <div className={styles.fieldName}>Timestamp</div>
            <div>{message.timestamp}</div>
          </div>
          <div className={styles.messageRow}>
            <div className={styles.messageContent}>
              <div className={styles.fieldName}>Message</div>
              <div>{message.text}</div>
            </div>
            {message.sender === myDid && (
              <button
                className={styles.deleteButton}
                onClick={() => deleteMessage(message.recordId)}
              >
                Delete
              </button>
            )}
          </div>
          {message.imageUrl && (
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={message.imageUrl}
                alt="Uploaded content"
              />
            </div>
          )}
          <div className={`${styles.messageType} ${styles[message.type.toLowerCase()]}`}>
            {message.type}
          </div>
        </div>
      ))}

    </div>
  );
}