import { FaqItem } from "../../models/stopfaq";

const faqMock: FaqItem[] = [
  {
    question: 'Welche Sehenswürdigkeiten gibt es in der Nähe dieser Haltestelle?',
    answer: `
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
    `
  },
  {
    question: 'Would you like to check dummy list?',
    answer: `
      <ul>
        <li>Item #1</li>
        <li>Item #2</li>
        <li>Item #3</li>
      </ul>
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p>
    ` 
  },
  {
    question: 'Wann fährt der letzte/erste U-Bahn Linie U2 / Richtung Harthof?',
    answer: `
    <p>
      !!Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    </p>
    <table>
      <tr>
        <th>Wochentag</th>
        <th>Betriebszeiten</th>
      </tr>
      <tr>
        <td>Montag</td>
        <td>00:05 - 23:55</td>
      </tr>
      <tr>
        <td>Dienstag</td>
        <td>00:15 - 23:55</td>
      </tr>
      <tr>
        <td>Mittwoch</td>
        <td>00:15 - 23:55</td>
      </tr>
      <tr>
        <td>Donnerstag</td>
        <td>00:15 - 23:55</td>
      </tr>
    </table>
    ` // might be markdown, or html if it should store in db
  },
];

export default faqMock;