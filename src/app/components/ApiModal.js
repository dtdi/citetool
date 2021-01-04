import {
  Modal,
  IconButton,
  Stack,
  Text,
  TextField,
  mergeStyleSets,
  getTheme,
  FontWeights,
  PrimaryButton,
} from "@fluentui/react";

const theme = getTheme();

export default function ApiModal(props) {
  const { isOpen, onClose, apiKey, onApiKeyChange } = props;

  return (
    <Modal
      isOpen={isOpen}
      isBlocking={false}
      containerClassName={contentStyles.container}
    >
      <div className={contentStyles.header}>
        <Text>Welcome to Potatosearch</Text>
        <IconButton
          styles={iconButtonStyles}
          iconProps={{ iconName: "Cancel" }}
          ariaLabel="Close popup modal"
          onClick={onClose}
        />
      </div>
      <div className={contentStyles.body}>
        <Stack tokens={{ childrenGap: 5 }}>
          <Text variant="mediumPlus">
            This website helps to discover exciting new papers in three easy
            steps:
          </Text>
          <Text>
            <ol>
              <li>
                To get started, use the search box above to start a search query
                on Scopus.
              </li>
              <li>
                Based on the results, we suggest relevant papers on the left,
                which you can mark as relevant or irrelevant using the buttons
                at the top. Your vote will automatically move the paper to the
                lists on the right side of the page. Based on the papers you
                rated as relevant, we will suggest new papers to rate. For this
                purpose, we use bibliometric data (i.e., co-citation &
                bibliometric coupling) to find papers that have a particularly
                high overlap with your selection.
              </li>
              <li>
                If you have identified enough papers or if our suggestions do
                not contain any more relevant papers, use the download function
                in the header to export your results as a list.
              </li>
            </ol>
          </Text>
          <Text variant="mediumPlus">
            Before you start: Please provide your Scopus API-Key:
          </Text>
          <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 10 }}>
            <TextField
              label="Provide in your API Code"
              style={{ width: 300 }}
              value={apiKey}
              onChange={onApiKeyChange}
            />
            <PrimaryButton onClick={onClose}>Save</PrimaryButton>
          </Stack>
        </Stack>
      </div>
    </Modal>
  );
}
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    width: "1000px",
    maxWidth: "100%",
  },
  header: [
    theme.fonts.xLarge,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px",
    },
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
  },
});

const iconButtonStyles = {
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px",
  },
  rootHovered: {
    color: theme.palette.neutralDark,
  },
};
