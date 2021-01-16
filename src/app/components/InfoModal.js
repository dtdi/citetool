import {
  Modal,
  IconButton,
  Stack,
  Text,
  TextField,
  mergeStyleSets,
  DefaultButton,
  getTheme,
  Link,
  FontWeights,
  PrimaryButton,
} from "@fluentui/react";

const theme = getTheme();

export default function InfoModal(props) {
  const { isOpen, onClose } = props;

  return (
    <Modal
      isOpen={isOpen}
      isBlocking={false}
      containerClassName={contentStyles.container}
    >
      <div className={contentStyles.header}>
        <Text>About Potatosearch</Text>
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
            Potatosearch makes heavy use of the{" "}
            <Link href="https://www.semanticscholar.org/?utm_source=api">
              SemanticScholar API
            </Link>
            .
          </Text>
          <Text>
            <div>
              Potato Icon made by{" "}
              <a
                href="https://www.flaticon.com/authors/good-ware"
                title="Good Ware"
              >
                Good Ware
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
          </Text>
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
