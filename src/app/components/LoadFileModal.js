import {
  Modal,
  IconButton,
  Stack,
  Text,
  mergeStyleSets,
  getTheme,
  FontWeights,
} from "@fluentui/react";

const theme = getTheme();

export default function LoadFileModal(props) {
  const { isOpen, onClose, onLoadFile } = props;

  return (
    <Modal
      isOpen={isOpen}
      isBlocking={false}
      containerClassName={contentStyles.container}
    >
      <div className={contentStyles.header}>
        <Text>Load your Data</Text>
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
            Load data from a PotatoSeachData.json File. Make sure to save your
            current data before loading a file as the loading process will reset
            all tables
          </Text>
          
          <Stack vertical verticalAlign="end" tokens={{ childrenGap: 10 }}>
            <input
              type="file"
              id="file"
              name="file"
              style={{ width: 400 }}
              onChange={onLoadFile}
             />
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
