import React from 'react';
import styled from 'styled-components';
import { parseLetterToPos } from '../utils';

type Props = {}

interface IFiveSection {
  main_title: string,
  content_text: IContentText[],
  sub_content_first: ISubContentFirst,
  sub_content_second: ISubContentSecond,
}

interface IContentText {
  title?: string,
  text?: string,
  text_with_link?: ITextWithLink
}

interface ITextWithLink {
  before_text?: string,
  url: string,
  link: string,
  after_text?: string,
  link_second?: string,
  url_second?: string,
  after_text_second?: string,
}

interface ISubContentFirst {
  title: string,
  list_first: IList[]
}

interface IList {
  text: string,
  text_second?: string,
  items?: IItem[],
  items_title?: String,
  items_link?: ILink[]
}

interface IItem {
  title?: string,
  text: string,
}

interface ILink {
  link: string,
  url: string,
  after_text: string,
}

interface ISubContentSecond {
  title_second: string,
  list_second: IListSecond[],
}

interface IListSecond {
  title?: string,
  text?: string,
  text_with_link?: ITextWithLink,
  items?: IItem[],
}

const FiveSection: React.FC<Props> = (props) => {
  
  return (
    <StyledWrapper>
      <h3 className="ninth-paragraph__sub-title">
          5. {fiveSection.main_title}
      </h3>
      {fiveSection.content_text.map((content: IContentText, index: number): React.ReactFragment => {
        return (
          <React.Fragment key={index}>
            <div 
              className="ninth-paragraph__text ninth-paragraph__sub-content"
              >
              {content.text
              ?
                (<p className="ninth-paragraph__sub-letter-content">
                  {content.text}
                </p>)
              : ''
              }
               {content.text_with_link?.before_text
              ?
                (<p className="ninth-paragraph__sub-letter-content">
                  {content.text_with_link.before_text}
                  <a href={content.text_with_link.url} className="ninth-paragraph__link">{content.text_with_link.link}</a>
                  {content.text_with_link.after_text}
                </p>)
              : ''
              }
              </div>
          </React.Fragment>
        )
      })}
      <h4 className="ninth-paragraph__sub-title">
        {fiveSection.sub_content_first.title}
      </h4>
      {fiveSection.sub_content_first.list_first.map((list: IList, index: number): React.ReactFragment => {
        return (
          <React.Fragment key={index}>
            <div 
              className="ninth-paragraph__text ninth-paragraph__sub-content"
            >
              <span className="ninth-paragraph__text--dark">
                {`${parseLetterToPos(index + 1)}) `}
              </span>
              <p className="ninth-paragraph__sub-letter-content">
                {list.text}
              </p>
            </div>
            {list.items_title
            ?
              (<h5 className="ninth-paragraph__sub-title">
                {list.items_title}
              </h5>)
            : ''
            }
            {list.items_link?.map((item: ILink, index_item: number): React.ReactNode => {
              return (
                  <p key={index_item}
                    className="ninth-paragraph__text ninth-paragraph__content"
                  >
                   <a href={item.url} className="ninth-paragraph__link">{item.link}</a>
                   {item.after_text}
                </p>
              )
            })}
            {list.items?.map((item: IItem, index_item: number): React.ReactNode => {
              return (
                  <p key={index_item}
                    className="ninth-paragraph__text ninth-paragraph__content"
                  >
                  {item.text}
                </p>
              )
            })}
            {list.text_second
            ? 
              (<div 
                className="ninth-paragraph__text ninth-paragraph__sub-content"
                >
                 <p className="ninth-paragraph__sub-letter-content">
                  {list.text_second}
                </p>
              </div>)
            : ''
            }
          </React.Fragment>
        )
      })}
      <h4 className="ninth-paragraph__sub-title">
        {fiveSection.sub_content_second.title_second}
      </h4>
      {fiveSection.sub_content_second.list_second.map((list_second: IListSecond, index: number): React.ReactFragment => {
        return (
          <React.Fragment key={index}>
            {list_second.title
            ?
              (<h5 className="ninth-paragraph__sub-title">
                {list_second.title}
              </h5>)
            : ''
            }
            {list_second.text
            ?
              (<div 
                className="ninth-paragraph__text ninth-paragraph__sub-content"
                >
                <p className="ninth-paragraph__sub-letter-content">
                  {list_second.text}
                </p>
              </div>)
            : ''
            }
            {list_second.text_with_link
            ? (
              <div 
                className="ninth-paragraph__text ninth-paragraph__sub-content"
              >
                <p
                  className="ninth-paragraph__text ninth-paragraph__sub-letter-content"
                >
                  {list_second.text_with_link.before_text ? list_second.text_with_link.before_text : ''}
                  <a href={list_second.text_with_link.url} className="ninth-paragraph__link">{list_second.text_with_link.link}</a>
                  {list_second.text_with_link.after_text ? list_second.text_with_link.after_text : ''}
                  {list_second.text_with_link.url_second
                  ?
                    (<a 
                      href={list_second.text_with_link.url_second}
                      className="ninth-paragraph__link">
                        {list_second.text_with_link.link_second}
                      </a>)
                  : ''
                  }
                  {list_second.text_with_link.after_text_second ? list_second.text_with_link.after_text_second : ''}
                </p>
              </div>)
            : ''
            }
            {list_second.items?.map((item: IItem, index: number): React.ReactNode => {
              return (
                <p key={index}
                  className="ninth-paragraph__text ninth-paragraph__content"
                >
                  {item.text}
                </p>
              ) 
            })}
          </React.Fragment>
        )
      })}
    </StyledWrapper>     
  );
}
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

.ninth-paragraph {
  &__title {
    ${props => props.theme.typography.fnMedium};
    ${props => props.theme.typography.fnTitle3};
    color: ${props => props.theme.colorValues.darkGrey};
    margin-bottom: 12px;
  }

  &__text {
    ${props => props.theme.typography.fnText};
    ${props => props.theme.typography.fnBody};
    color: ${props => props.theme.colorValues.lightgrey};
 
    &--dark {
      color: ${props => props.theme.colorValues.darkGrey};
    }
  }

  &__link {
    color: ${props => props.theme.colorValues.primary};
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  &__sub-title {
    ${props => props.theme.typography.fnMedium};
    font-size: 16px;
    letter-spacing: 0;
    line-height: 22px;
    color: ${props => props.theme.colorValues.grey};
    margin: 12px 0;
  }

  &__content {
    display: flex;
    padding-left: 25px;
    position: relative;
    margin-left: 25px;
    margin-bottom: 12px;

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: 6px;
      height: 7px;
      top: 7px;
      left: 0;
      border-radius: 100%;
      border: 1px solid #000;
      background-color: #fff;
    }
  }

  &__sub-content {
    display: flex;
    position: relative;
    margin-bottom: 12px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  &__sub-letter-content {
    padding-left: 12px;
  }
}
`;

const fiveSection: IFiveSection ={
  main_title: "Drittanbieter",
  content_text: [
    {
      text: `Es kann vorkommen, dass innerhalb unseres Onlineangebotes Inhalte oder Dienste von Drittanbietern, wie zum Beispiel Stadtpläne von
      anderen Webseiten eingebunden werden. Die Einbindung von Inhalten der Drittanbieter setzt immer voraus, dass die Drittanbieter die
      IP-Adresse der Nutzer wahrnehmen, da sie ohne die IP-Adresse die Inhalte nicht an den Browser der Nutzer senden könnten. Die IP-Adresse ist
      damit für die Darstellung der Inhalte erforderlich. Des Weiteren können die Anbieter der Dritt-Inhalte eigene Cookies setzen und die Daten
      der Nutzer für eigene Zwecke verarbeiten. Dabei können aus den verarbeiteten Daten Nutzungsprofile der Nutzer erstellt werden. Wir werden
      diese Inhalte möglichst datensparsam und datenvermeidend einsetzen sowie im Hinblick auf die Datensicherheit zuverlässige Drittanbieter
      wählen.`
    },
    {
      text_with_link: {
        before_text: `Soweit auf diesen Internetseiten Google Dienste wie Google Analytics oder Google Maps verwendet werden, erfolgen diese durch einen
        Serveraufruf, in der Regel ein Server von Google in den USA. Zur Gewährleistung eines angemessenen Schutzniveaus zum Schutz Ihrer
        personenbezogenen Daten hat sich Google dem sog. EU-US Privacy Shield unterworfen, siehe unter `,
        url: 'https://www.privacy-shield.gov/EU-US-Framework',
        link: 'https://www.privacy-shield.gov/EU-US-Framework.',
        after_text: ` Aufgrund dieses Abkommens zwischen den USA und der Europäischen Kommission hat letztere für unter dem Privacy Shield zertifizierte
        Unternehmen ein angemessenes Datenschutzniveau festgestellt.`
      }
    },
    {
      text: "Wir verwenden derzeit Services von folgenden Drittanbietern:"
    }
  ],
  sub_content_first: {
    title: "Google analytics",
    list_first: [
      {
        text: `Wir nutzen Google Analytics, ein Webanalysedienst der Google Inc., 1600 Amphitheatre Parkway, Mountain View, California 94043,USA
        (im Folgenden „Google“). In diesem Zusammenhang werden pseudonymisierte Nutzungsprofile erstellt und Cookies (siehe unter Ziff. 4) verwendet.
        Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website wie`,
        items: [
          {
            text: "Browser-Typ/-Version"
          },
          {
            text: "verwendetes Betriebssystem"
          },
          {
            text: "Referrer-URL (die zuvor besuchte Seite)"
          },
          {
            text: "Hostname des zugreifenden Rechners (IP-Adresse)"
          },
          {
            text: "Uhrzeit der Serveranfrage"
          }
        ],
        text_second: `werden an einen Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf
        dieser Webseite, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten
        des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in
        den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der
        Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung
        verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte
        IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt.`
      },
      {
        text: `Wir nutzen Google Analytics, um die Nutzung unserer Website analysieren und regelmäßig verbessern zu können. Über die gewonnenen
        Statistiken können wir unser Angebot verbessern und für Sie als Nutzer interessanter ausgestalten.`
      },
      {
        text: `Die Nutzung von Google Analytics stellt insofern ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f) DSGVO dar. Wir haben mit
        Google einen Vertrag zur Auftragsdatenverarbeitung abgeschlossen.`
      },
      {
        text: ` Widerspruch gegen Datenerfassung: Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software
        verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich
        werden nutzen können. Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten
        (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare
        Browser-Plugin herunterladen und installieren. Opt-Out-Cookies verhindern die zukünftige Erfassung Ihrer Daten beim Besuch dieser Website. Um die
        Erfassung durch Universal Analytics über verschiedene Geräte hinweg zu verhindern, müssen Sie das Opt-Out auf allen genutzten Systemen durchführen.
        Wenn Sie hier klicken, wird das Opt-Out-Cookie gesetzt:`,
        items_title: "Google Analytics deaktivieren",
        items_link: [
          {
            link: "Nutzerbedingungen",
            url: "https://marketingplatform.google.com/about/analytics/terms/de/",
            after_text: ","
          },
          {
            link: "Übersicht zum Datenschutz",
            url: "https://marketingplatform.google.com/about/",
            after_text: ", sowie die"
          },
          {
            link: "Datenschutzerklärung",
            url: "https://policies.google.com/privacy?hl=de&gl=de",
            after_text: "."
          }
        ]
      }
    ]
  },
  sub_content_second: {
    title_second: "PLUGINS UND TOOLS.",
    list_second: [
      {
        title: "Google Maps"
      },
      {
        text: `Diese Website verlinkt auf Google Maps zur Darstellung interaktiver Karten und zur Erstellung von Anfahrtsbeschreibungen. Google Maps ist ein
        Kartendienst von Google Inc., 1600 Amphitheatre Parkway, Mountain View, California 94043, USA.`
      },
      {
        text: `Durch die Nutzung von Google Maps können Informationen über die Benutzung dieser Website einschließlich Ihrer IP-Adresse und der im Rahmen der
        Routenplanerfunktion eingegebenen (Start-) Adresse an Google in den USA übertragen werden Wenn Sie eine Website unseres Internetauftritts aufrufen, die
        Google Maps enthält, baut Ihr Browser eine direkte Verbindung mit den Servern von Google auf. Der Karteninhalt wird von Google direkt an Ihren Browser
        übermittelt und von diesem in die Website eingebunden.`
      },
      {
        text_with_link: {
          before_text: `Daher haben wir keinen Einfluss auf den Umfang der auf diese Weise von Google erhobenen Daten. Gemäß der Google-Datenschutzerklärung
          sind dies zumindest `,
          url: "https://policies.google.com/privacy?hl=de",
          link: "folgende Daten, siehe:"
        }
      },
      {
        items: [
          {
            text: 'Datum und Uhrzeit des Besuchs auf der betreffenden Website'
          },
          {
            text: 'Internetadresse oder URL der aufgerufenen Website'
          },
          {
            text: 'IP-Adresse'
          },
          {
            text: 'im Rahmen der Routenplanung eingegebene (Start-)Anschrift'
          }
        ]
      },
      {
        text: `Nähere Informationen entnehmen Sie bitte dem vorgenannten link (Datenschutzerklärung für Google Dienste). Auf die weitere Verarbeitung und Nutzung
        der Daten durch Google haben wir keinen Einfluss und können daher hierfür keine Verantwortung übernehmen.`
      },
      {
        text: `Wenn Sie nicht möchten, dass Google über unseren Internetauftritt Daten über Sie erhebt, verarbeitet oder nutzt, können Sie in Ihrem Browsereinstellungen
        JavaScript deaktivieren. In diesem Fall können Sie die Kartenanzeige jedoch nicht nutzen.`
      },
      {
        text: `Nähere Informationen über die Datenverarbeitung durch Google können Sie den Datenschutzhinweisen von Google entnehmen. Dort können Sie im Datenschutzcenter
        Ihre Daten verwalten und Einstellungen zum besseren Datenschutz vornehmen.`
      },
      {
        text_with_link: {
          before_text: 'Eine ausführliche Anleitung zur Verwaltung der eigenen Daten im Zusammenhang mit Google-Produkten finden Sie ',
          url: "https://policies.google.com/privacy?hl=de",
          link: "hier",
          after_text: `: https://policies.google.com/privacy/update?hl=de unter „Datenschutzeinstellungen“.`
        }
      },
      {
        text: `Durch die Nutzung unserer Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google Maps Routenplaner in der zuvor beschriebenen
        Art und Weise und zu dem zuvor benannten Zweck einverstanden.`
      },
      {
        title: "Google Webfonts",
      },
      {
        text_with_link: {
          before_text: `Um unsere Inhalte browserübergreifend korrekt und grafisch ansprechend darzustellen, verwenden wir auf dieser Website Scriptbibliotheken und
          Schriftbibliotheken wie z. B.`,
          url: "https://fonts.google.com/",
          link: "Google Webfonts",
          after_text: ` (https://www.google.com/webfonts/). Google Webfonts werden zur Vermeidung mehrfachen Ladens in den Cache Ihres Browsers übertragen. Falls der Browser
          die Google Webfonts nicht unterstützt oder den Zugriff unterbindet, werden Inhalte in einer Standardschrift angezeigt. Der Aufruf von Scriptbibliotheken oder
          Schriftbibliotheken löst automatisch eine Verbindung zum Betreiber der Bibliothek aus. Dabei ist es theoretisch möglich – aktuell allerdings auch unklar ob und ggf.
          zu welchen Zwecken – dass Betreiber entsprechender Bibliotheken Daten erheben. Die Datenschutzrichtlinie des Bibliothekbetreibers Google finden Sie `,
          url_second: "https://policies.google.com/privacy",
          link_second: "hier",
          after_text_second: ": https://www.google.com/policies/privacy/.",
        }
      },
      {
        title: "Google+"
      },
      {
        text: `Wir verwenden auf unserer Webseite das Social Media Plug-in „Google+“ (Google Plus) der Firma Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043 USA,
        nachfolgende „Google“.`
      },
      {
        text: `Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein solches Plug-in enthält, baut Ihr Browser eine direkte Verbindung mit den Servern von Google auf. Der
        Inhalt des Plug-ins wird von Google direkt an Ihren Browser übermittelt und von diesem in die Webseite eingebunden. Durch die Einbindung der Plug-ins erhält Google k die
        Information, dass Ihr Browser die entsprechende Seite unseres Webauftritts aufgerufen hat, auch wenn Sie kein Google+ Konto besitzen oder gerade nicht bei Google+
        eingeloggt sind.`
      },
      {
        text: `Sind Sie bei Google+ eingeloggt, kann Google den Besuch unserer Website Ihrem Google+-Konto direkt zuordnen. Wenn Sie mit den Plug-ins interagieren, zum Beispiel
        durch Anklicken des Buttons oder Hinterlassen eines Kommentars, wird die entsprechende Information ebenfalls direkt an einen Server von Google übermittelt und
        dort gespeichert. Die Informationen werden zudem auf Google veröffentlicht und Ihren Google-Freunden angezeigt.`
      },
      {
        text: `Google kann diese Informationen zum Zwecke der Werbung, Marktforschung und bedarfsgerechten Gestaltung der Google-Seiten benutzen. Hierzu werden von Google Nutzungs-,
        Interessen- und Beziehungsprofile erstellt, z. B. um Ihre Nutzung unserer Website im Hinblick auf die Ihnen bei Google eingeblendeten Werbeanzeigen auszuwerten, andere
        Google-Nutzer über Ihre Aktivitäten auf unserer Website zu informieren und um weitere mit der Nutzung von Google verbundene Dienstleistungen zu erbringen.`
      },
      {
        text: `Wenn Sie nicht möchten, dass Google die über unseren Webauftritt gesammelten Daten Ihrem Google+-Konto zu- ordnet, müssen Sie sich vor Ihrem Besuch unserer Website bei
        Google ausloggen.`
      },
      {
        text_with_link: {
          before_text: `Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch Google sowie Ihre diesbezüglichen Rechte und Einstellungsmöglichkeiten
          zum Schutz Ihrer Privatsphäre entnehmen Sie bitte den `,
          url: 'https://policies.google.com/privacy',
          link: 'Datenschutzhinweisen',
          after_text: " (https://www.google.com/policies/privacy/) von Google."
        }
      },
      {
        title: "Facebook"
      },
      {
        text: `Auf unserer Website kommen Social-Media Plugins von Facebook zum Einsatz, um deren Nutzung persönlicher zu gestalten. Hierfür nutzen wir den „LIKE“ oder „TEILEN“-Button.
        Es handelt sich dabei um ein Angebot von Facebook.`
      },
      {
        text: `Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein solches Plugin enthält, baut Ihr Browser eine direkte Verbindung mit den Servern von Facebook auf.
        Der Inhalt des Plugins wird von Facebook direkt an Ihren Browser übermittelt und von diesem in die Webseite eingebunden.`
      },
      {
        text: `Durch die Einbindung der Plugins erhält Facebook die Information, dass Ihr Browser die entsprechende Seite unseres Webauftritts aufgerufen hat, auch wenn Sie kein
        Facebook- Konto besitzen oder gerade nicht bei Facebook eingeloggt sind. Diese Information (einschließlich Ihrer IP-Adresse) wird von Ihrem Browser direkt an einen Server
        von Facebook in den USA übermittelt und dort gespeichert.`
      },
      {
        text: `Sind Sie bei Facebook eingeloggt, kann Facebook den Besuch unserer Website Ihrem Facebook-Konto direkt zuordnen. Wenn Sie mit den Plugins interagieren, zum Beispiel den
        „LIKE“ oder „TEILEN“-Button betätigen, wird die entsprechende Information ebenfalls direkt an einen Server von Facebook übermittelt und dort gespeichert. Die Informationen werden
        zudem auf Facebook veröffentlicht und Ihren Facebook-Freunden angezeigt.`
      },
      {
        text: `Facebook kann diese Informationen zum Zwecke der Werbung, Marktforschung und bedarfsgerechten Gestaltung der Facebook-Seiten benutzen. Hierzu werden von Facebook Nutzungs-,
        Interessen- und Beziehungsprofile erstellt, z. B. um Ihre Nutzung unserer Website im Hinblick auf die Ihnen bei Facebook eingeblendeten Werbeanzeigen auszuwerten,
        andere Facebook-Nutzer über Ihre Aktivitäten auf unserer Website zu informieren und um weitere mit der Nutzung von Facebook verbundene Dienstleistungen zu erbringen.`
      },
      {
        text: `Wenn Sie nicht möchten, dass Facebook die über unseren Webauftritt gesammelten Daten Ihrem Facebook-Konto zu- ordnet, müssen Sie sich vor Ihrem Besuch unserer
        Website bei Facebook ausloggen.`
      },
      {
        text_with_link: {
          before_text: `weck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch Facebook sowie Ihre diesbezüglichen Rechte und
          Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre entnehmen Sie bitte den `,
          url: "https://www.facebook.com/about/privacy/",
          link: "Datenschutzhinweisen",
          after_text: ` (https://www.facebook.com/about/privacy/) von Facebook.`
        }
      },
      {
        title: "Instagram"
      },
      {
        text: `Auf unserer Website werden auch sogenannte Social Plugins („Plugins“) von Instagram verwendet, das von der Instagram LLC., 1601 Willow Road,
        Menlo Park, CA 94025, USA („Instagram“) betrieben wird.`
      },
      {
        text: `Die Plugins sind mit einem Instagram-Logo beispielsweise in Form einer „Instagram-Kamera“ gekennzeichnet. Wenn Sie eine Seite unseres Webauftritts aufrufen,
        die ein solches Plugin enthält, stellt Ihr Browser eine direkte Verbindung zu den Servern von Instagram her. Der Inhalt des Plugins wird von Instagram direkt an Ihren Browser
        übermittelt und in die Seite eingebunden. Durch diese Einbindung erhält Instagram die Information, dass Ihr Browser die entsprechende Seite unseres Webauftritts aufgerufen hat,
        auch wenn Sie kein Instagram-Profil besitzen oder gerade nicht bei Instagram eingeloggt sind.`
      },
      {
        text: `Diese Information (einschließlich Ihrer IP-Adresse) wird von Ihrem Browser direkt an einen Server von Instagram in die USA übermittelt und dort gespeichert.
        Sind Sie bei Instagram eingeloggt, kann Instagram den Besuch unserer Website Ihrem Instagram-Account unmittelbar zuordnen. Wenn Sie mit den Plugins interagieren,
        zum Beispiel das „Instagram“- Button betätigen, wird diese Information ebenfalls direkt an einen Server von Instagram übermittelt und dort gespeichert.`
      },
      {
        text: "Die Informationen werden außerdem auf Ihrem Instagram-Account veröffentlicht und dort Ihren Kontakten angezeigt."
      },
      {
        text: `Wenn Sie nicht möchten, dass Instagram die über unseren Webauftritt gesammelten Daten unmittelbar Ihrem Instagram-Account zuordnet,
        müssen Sie sich vor Ihrem Besuch unserer Website bei Instagram ausloggen.`
      },
      {
        text_with_link: {
          before_text: "Weitere Informationen hierzu Sie in der ",
          url: "https://help.instagram.com/155833707900388",
          link: "Datenschutzerklärung",
          after_text: " (https://help.instagram.com/155833707900388) von Instagram."
        }
      },
      {
        title: "Pinterest"
      },
      {
        text: "Auf dieser Internetseite wird ein Dienst von pinterest.com eingesetzt. Pinterest.com ist ein Service der Pinterest, Inc., 808 Brannan St, San Francisco, CA 94103, USA."
      },
      {
        text_with_link: {
          before_text: `Pinterest erhält durch den eingebundenen Pinterest-Button („Pin it“) auf unserer Website Information, dass Sie die entsprechende Website unseres
          Internetauftritts aufgerufen haben. Sind Sie bei diesem Vorgang bei Pinterest eingeloggt, kann Pinterest den Besuch auf unserer Seite Ihrem Pinterest-Konto zuordnen und die
          Daten verknüpfen. Die durch Anklicken des Pinterest-Buttons („Pin it“) übermittelten Daten werden von Pinterest gespeichert. Details zur Datenerhebung, Verarbeitung und Nutzung
          durch Pinterest sowie zu Ihren Rechten und Einstellungsmöglichkeiten können Sie den Datenschutzhinweisen von Pinterest entnehmen. Diese Hinweise finden Sie unter `,
          url: "http://pinterest.com/about/privacy/",
          link: "http://pinterest.com/about/privacy/",
          after_text: "."
        }
      },
      {
        title: "LinkedIn"
      },
      {
        text: `Auf dieser Internetseite wird der „LinkedIn Share-Button“ eingesetzt. LinkedIn ist ein Service der LinkedIn Corporation, 2029 Stierlin Court, Mountain View, CA 94043, USA.
        Bei jedem einzelnen Abruf unserer Webseite, die mit einer solchen Share-Button ausgestattet ist, veranlasst dieser, dass der von Ihnen verwendete Browser eine entsprechende
        Darstellung der Komponente von LinkedIn herunterlädt.`
      },
      {
        text: `Durch diesen Vorgang wird LinkedIn darüber in Kenntnis gesetzt, welche konkrete Seite unserer Internetpräsenz gerade besucht wird. Wenn Sie den „LinkedIn Share-Button“
        anklicken während Sie in Ihrem LinkedIn-Account eingeloggt sind, können Sie die Inhalte unserer Seiten auf Ihrem LinkedIn-Profil verlinken.
        Dadurch ist LinkedIn in der Lage, den Besuch unserer Seiten Ihrem LinkedIn-Benutzerkonto zuordnen.`
      },
      {
        text_with_link: {
          before_text: `Wir haben weder Einfluss auf die Daten, die LinkedIn hierdurch erhebt, noch über den Umfang dieser durch LinkedIn erhobenen Daten.
          Auch haben wir keine Kenntnis vom Inhalt der an LinkedIn übermittelten Daten. Details zur Datenerhebung durch LinkedIn sowie zu Ihren Rechten und Einstellungsmöglichkeiten können
          Sie den Datenschutzhinweisen von LinkedIn entnehmen. Diese Hinweise finden Sie unter `,
          url: "https://www.linkedin.com/legal/privacy-policy",
          link: "https://www.linkedin.com/legal/privacy-policy",
          after_text: "."
        }
      },
      {
        title: "Xing"
      },
      {
        text: `Auf dieser Internetseite wird der „XING Share-Button“ eingesetzt. Beim Aufruf dieser Internetseite wird über Ihren Browser kurzfristig eine Verbindung zu Servern der
        XING SE („XING“) aufgebaut, mit denen die „XING Share-Button“-Funktionen (insbesondere die Berechnung/Anzeige des Zählerwerts) erbracht werden. XING speichert keine personenbezogenen
        Daten von Ihnen über den Aufruf dieser Internetseite. XING speichert insbesondere keine IP-Adressen. Es findet auch keine Auswertung Ihres Nutzungsverhaltens über die Verwendung von
        Cookies im Zusammenhang mit dem „XING Share-Button“ statt.`
      },
      {
        text_with_link: {
          before_text: "Die jeweils aktuellen Datenschutzinformationen zum „XING Share-Button“ und ergänzende Informationen können Sie auf dieser Internetseite abrufen: ",
          url: "https://dev.xing.com/plugins/terms_and_conditions",
          link: "https://www.xing.com/app/share?op=data_protection",
          after_text: "."
        }
      },
      {
        title: "Twitter"
      },
      {
        text_with_link: {
          before_text: `Auf unseren Internetseiten sind Plugins des Kurznachrichtennetzwerks der Twitter Inc. (Twitter) integriert. Die Twitter-Plugins (tweet-Button) erkennen Sie an dem
          Twitter-Logo auf unserer Seite. Eine Übersicht über tweet-Buttons finden Sie hier (`,
          url: "https://www.fahrplan.guru/datenschutz",
          link: "https://about.twitter.com/resources/buttons",
          after_text: ")."
        }
      },
      {
        text: `Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein solches Plugin enthält, wird eine direkte Verbindung zwischen Ihrem Browser und dem Twitter-Server hergestellt.
        Twitter erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht haben. Wenn Sie den Twitter „tweet-Button“ anklicken, während Sie in Ihrem Twitter-Account
        eingeloggt sind, können Sie die Inhalte unserer Seiten auf Ihrem Twitter-Profil verlinken. Dadurch kann Twitter den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen. Wir weisen
        darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Twitter erhalten.`
      },
      {
        text: "Wenn Sie nicht wünschen, dass Twitter den Besuch unserer Seiten zuordnen kann, loggen Sie sich bitte aus Ihrem Twitter-Benutzerkonto aus."
      },
      {
        text_with_link: {
          before_text: "Weitere Informationen hierzu finden Sie in der ",
          url: "https://twitter.com/ru/privacy",
          link: "Datenschutzerklärung",
          after_text: " von Twitter (https://twitter.com/privacy)."
        }
      },
      {
        title: "Eingebettete YouTube-Videos"
      },
      {
        text: `Auf einigen unserer Websites betten wir Youtube-Videos ein. Betreiber der entsprechenden Plugins ist die YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA.
        Wenn Sie eine Seite mit dem YouTube-Plugin besuchen, wird eine Verbindung zu Servern von Youtube hergestellt. Dabei wird Youtube mitgeteilt, welche Seiten Sie besuchen.
        Wenn Sie in Ihrem Youtube-Account eingeloggt sind, kann Youtube Ihr Surfverhalten Ihnen persönlich zuordnen. Dies verhindern Sie, indem Sie sich vorher aus Ihrem Youtube-Account ausloggen.`
      },
      {
        text: "Wird ein Youtube-Video gestartet, setzt der Anbieter Cookies ein, die Hinweise über das Nutzerverhalten sammeln."
      },
      {
        text: `Wer das Speichern von Cookies für das Google-Ad-Programm deaktiviert hat, wird auch beim Anschauen von Youtube-Videos mit keinen solchen Cookies rechnen müssen.
        Youtube legt aber auch in anderen Cookies nicht-personenbezogene Nutzungsinformationen ab. Möchten Sie dies verhindern, so müssen Sie das Speichern von Cookies im Browser blockieren.`
      },
      {
        text_with_link: {
          before_text: "Weitere Informationen zum Datenschutz bei „Youtube“ finden Sie in der Datenschutzerklärung des Anbieters unter: ",
          url: "https://policies.google.com/privacy?hl=de&gl=de",
          link: "https://www.google.de/intl/de/policies/privacy/",
          after_text: "."
        }
      }
    ]
  }
};


export default FiveSection;