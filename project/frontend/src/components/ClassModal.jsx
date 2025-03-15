import { Modal, Text } from "@mantine/core";

function ClassModal({ opened, onClose, data }) {
  return (
    <Modal opened={opened} onClose={onClose} title="Class Times">
      <div>
        <Text>
          <strong>Class Type:</strong> {data.classType}
        </Text>
        <Text>
          <strong>Duration:</strong> {data.classDuration}
        </Text>

        {/* Add class times */}
        
      </div>
    </Modal>
  );
}

export default ClassModal;