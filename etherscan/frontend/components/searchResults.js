import React from 'react';
import CopyToClipboard from './CopyToClipboard';
import moment from "moment";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCube,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";

export default function SearchResults(props) {
  
  if (props.result.searchInput.length == 66) {  //交易的搜索结果
    const result = props.result.result;
    return (
      <section className={styles.searchResults}>
          <table className={styles.txnSection}>
            <tr>
              <td className={styles.tdContract}>
                <FontAwesomeIcon
                  icon={faFileContract}
                  className={styles.tdContract}
                  color="white"
                />
              </td>
              <td style={{ color: 'white' }}>
                &nbsp;&nbsp;Transaction hash: &nbsp; 
              </td>
              <td className={styles.blueText}>
                {result.hash}
              </td>
            </tr>

            <tr> &nbsp; </tr>
            <tr> &nbsp; </tr>

            <tr>
              <td style={{ color: 'white' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time: &nbsp;
              </td>
              <td className={styles.blueText}>
                {result.block_timestamp.split("T", 1)[0]}
              </td>
            </tr>
            <tr> &nbsp; </tr>
            <tr> &nbsp; </tr>
            <tr>
              <td style={{ color: 'white' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Block Number: &nbsp; 
              </td>
              <td className={ styles.blueText }>
                {result.block_number}
              </td>
            </tr>

            <tr> &nbsp; </tr>
            <tr> &nbsp; </tr>

            <tr>
              <td className={styles.tdIcon}>
                <FontAwesomeIcon icon={faCube} color="white" />
              </td>
              <td style={{ color: 'white' }}>
                From: &nbsp;
              </td>
              <td className={ styles.blueText }>
                {result.from_address}
              </td>
            </tr>

            <tr> &nbsp; </tr>
            <tr> &nbsp; </tr>

            <tr>
              <td className={styles.tdIcon}>
                <FontAwesomeIcon icon={faCube} color="white" />
              </td>
              <td style={{ color: 'white' }}>
                To: &nbsp;
              </td>
              <td className={styles.blueText}>
                {result.from_address}
              </td>
            </tr>

            <tr> &nbsp; </tr>
            <tr> &nbsp; </tr>

            <tr>
              <td style={{ color: 'white' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gas Price: &nbsp; 
              </td>
              <td className={styles.blueText}>
                {result.gas_price / 10 ** 9} Gwei
              </td>
            </tr>
          </table>
          <tr> &nbsp; </tr>
          <tr> &nbsp; </tr>
          <tr> &nbsp; </tr>
      </section>
    );
  } else if (props.result.searchInput.length == 42) {  //区块的搜索结果
    return (
      <section className={styles.searchResults}>
        <p className={styles.amountOfTransactions}>
          Latest 25 from a total of{" "}
          <span className={styles.blueText}>{props.result.result.length}</span>
          transactions
        </p>
        <table className={styles.txnSection}>
          <thead>
            <tr className={styles.txnTitle}>
              <th>Transaction Hash</th>
              <th>Method</th>
              <th>Block</th>
              <th className={styles.blueText}>Age</th>
              <th>From</th>
              <th></th>
              <th>To</th>
              <th>Value</th>
              <th className={styles.blueText}>Txn Fee</th>
            </tr>
          </thead>
          {props.result.result.map((txn) => {
            return (
              <tr className={styles.txn}>
                <CopyToClipboard text={txn.hash} className={styles.blueText} title={txn.hash} > </CopyToClipboard>
                <td>
                  <span className={styles.transfer}>
                    {txn.decoded_call ? txn.decoded_call.label : "Unknown"}
                  </span>
                </td>
                <td className={styles.blueText} title={txn.block_number}> {txn.block_number} </td>
                <td>{moment(txn.block_timestamp, "YYYYMMDD").fromNow()}</td>
                
                <CopyToClipboard text={txn.from_address} className={styles.blueText} title={txn.hash} > </CopyToClipboard>

                <td>
                  <span
                    className={`${
                      txn.from_address.toLowerCase() !==
                      props.result.searchInput.toLowerCase()
                        ? styles.inTxn
                        : styles.outTxn
                    }`}
                  >
                    {txn.from_address.toLowerCase() !==
                    props.result.searchInput.toLowerCase()
                      ? "IN"
                      : "OUT"}
                  </span>
                </td>

                <CopyToClipboard text={txn.to_address} className={styles.blueText} title={txn.hash} > </CopyToClipboard>
                <td>{(txn.value / 10 ** 18).toFixed(5)} ETH</td>
                <td>{(txn.gas_price / 10 ** 18).toFixed(12)}</td>
              </tr>
            );
          })}
        </table>
      </section>
    );
  }
}
