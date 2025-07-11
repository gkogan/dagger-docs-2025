export const ShellTabs = ({
  systemShellCommand,
  daggerShellCommand,
  daggerCliCommand,
  scriptCommand,
}) => {
  // Determine which tabs should be visible based on provided commands
  const availableTabs = [];
  if (systemShellCommand) availableTabs.push("system");
  if (daggerShellCommand) availableTabs.push("dagger");
  if (daggerCliCommand) availableTabs.push("cli");
  if (scriptCommand) availableTabs.push("script");

  // Set initial preferred shell to the first available tab
  const [preferredShell, setPreferredShell] = useState(
    availableTabs.length > 0 ? availableTabs[0] : null
  );

  // Load preferred shell from localStorage on component mount
  useEffect(() => {
    const savedShell = localStorage.getItem("preferredShell");
    // Only use saved shell if it's still available
    if (savedShell && availableTabs.includes(savedShell)) {
      setPreferredShell(savedShell);
    }
  }, [availableTabs]);

  // Save preferred shell to localStorage when it changes
  useEffect(() => {
    if (preferredShell) {
      localStorage.setItem("preferredShell", preferredShell);
    }
  }, [preferredShell]);

  const handleShellChange = (shell) => {
    setPreferredShell(shell);
  };

  const getFriendlyName = (shell) => {
    switch (shell) {
      case "system":
        return "System Shell";
      case "dagger":
        return "Dagger Shell";
      case "cli":
        return "Dagger CLI";
      case "script":
        return "Script";
      default:
        return shell ? shell.charAt(0).toUpperCase() + shell.slice(1) : "Shell";
    }
  };

  const renderCommand = (command, shell) => {
    // If no command is provided, don't render anything
    if (!command) return null;

    // Remove any variable syntax and get the actual command
    const actualCommand =
      typeof command === "string" ? command.replace(/\{.*?\}/g, "").trim() : "";

    // Use the CodeBlock component from your documentation framework
    // This component should know how to properly render code with syntax highlighting
    return (
      <CodeBlock
        language="shell"
        className="shell-command"
        icon="terminal"
        wrap="true"
        filename={getFriendlyName(shell)}
      >
        {actualCommand}
      </CodeBlock>
    );
  };

  // If no tabs are available, don't render anything
  if (availableTabs.length === 0) {
    return null;
  }

  // If only one tab is available, render just the command without tabs
  if (availableTabs.length === 1) {
    const onlyTab = availableTabs[0];
    const command =
      onlyTab === "system"
        ? systemShellCommand
        : onlyTab === "dagger"
        ? daggerShellCommand
        : onlyTab === "cli"
        ? daggerCliCommand
        : scriptCommand;

    return <div>{renderCommand(command, onlyTab)}</div>;
  }

  return (
    <div>
      <Tabs>
        {systemShellCommand && (
          <Tab
            title="System Shell"
            active={preferredShell === "system"}
            onClick={() => handleShellChange("system")}
          >
            {renderCommand(systemShellCommand, "system")}
          </Tab>
        )}
        {daggerShellCommand && (
          <Tab
            title="Dagger Shell"
            active={preferredShell === "dagger"}
            onClick={() => handleShellChange("dagger")}
          >
            {renderCommand(daggerShellCommand, "dagger")}
          </Tab>
        )}
        {daggerCliCommand && (
          <Tab
            title="Dagger CLI"
            active={preferredShell === "cli"}
            onClick={() => handleShellChange("cli")}
          >
            {renderCommand(daggerCliCommand, "cli")}
          </Tab>
        )}
        {scriptCommand && (
          <Tab
            title="Script"
            active={preferredShell === "script"}
            onClick={() => handleShellChange("script")}
          >
            {renderCommand(scriptCommand, "script")}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

// For backward compatibility with the CodeGroup usage
export default function ({ children }) {
  // Parse commands from children if using the old format
  const commands = {
    systemShellCommand: null,
    daggerShellCommand: null,
    daggerCliCommand: null,
    scriptCommand: null,
  };

  // Process children to extract actual command values if available
  if (children) {
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props?.title) {
        const title = child.props.title.toLowerCase();
        const content =
          typeof child.props.children === "string" ? child.props.children : "";

        if (title.includes("system")) {
          commands.systemShellCommand = content;
        } else if (title.includes("dagger shell")) {
          commands.daggerShellCommand = content;
        } else if (title.includes("dagger cli")) {
          commands.daggerCliCommand = content;
        } else if (title.includes("script")) {
          commands.scriptCommand = content;
        }
      }
    });
  }

  return <ShellTabs {...commands} />;
}
