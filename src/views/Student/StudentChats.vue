<template>
  <div>
    <div class="columns">
      <div class="column is-one-quarter chat-wrapper">
        <div
          v-for="room in rooms"
          :key="room.roomId"
          @click="
            () => {
              onRoomSelect(room.roomId);
            }
          "
          class="hover-style chat"
        >
          {{ room.tutorName }}
        </div>
      </div>
      <div class="column">
        <div class="message-area" ref="messageContainer">
          <div
            v-for="(messageItem, index) in messages"
            :key="index"
            :class="
              messageItem.senderUsername === studentUsername
                ? `current-user`
                : `not-current-user`
            "
          >
            <div
              :class="`message-item ${
                messageItem.senderUsername === studentUsername
                  ? `current-user-message-item`
                  : `not-current-user-message-item`
              }`"
            >
              {{ messageItem.message }}
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column mb-2">
            <b-input
              placeholder="Enter your message"
              expanded
              v-model="message"
              rounded
              @keydown.native="onMessageEnter"
            />
          </div>
          <div class="column is-narrow mx-2 mb-2">
            <b-button rounded @click="sendMessage">Send</b-button>
          </div>
        </div>
      </div>
    </div>
    <AppLoader :isLoading="isLoading" />
  </div>
</template>

<script>
import AppLoader from "@/components/AppLoader/appLoader.vue";
import { apiRequestManager } from "@/util/util";
import { io } from "socket.io-client";

export default {
  name: "StudentChats",
  data() {
    return {
      socket: null,
      isLoading: false,
      messageFromAllRooms: [],
      messages: [],
      selectedRoomId: "",
      rooms: [],
      message: "",
      studentUsername: "",
    };
  },
  components: {
    AppLoader,
  },
  created() {
    this.socket = io("https://level-up-pmy6.onrender.com");
    this.socket.on("receiveMessage", this.handleIncomingMessage);
    this.socket.on("loadOldMessages", this.handleOldMessages);
  },
  methods: {
    joinRoom(studentUsername, tutorUsername) {
      this.socket.emit("joinRoom", { studentUsername, tutorUsername });
    },
    sendMessage() {
      this.socket.emit("sendMessage", {
        roomId: this.selectedRoomId,
        senderUsername: this.studentUsername,
        message: this.message,
      });

      this.message = "";
    },
    handleIncomingMessage({ roomId, senderUsername, message }) {
      const isFound = this.messageFromAllRooms.find(
        (room) => room.roomId === roomId
      );

      if (isFound) {
        isFound.messages.push({ senderUsername, message });
        this.messages = isFound.messages;
        this.$nextTick(() => {
          const container = this.$refs.messageContainer;
          container.scrollTop = container.scrollHeight;
        });
        return;
      }

      this.messageFromAllRooms.push({
        roomId,
        messages: [{ senderUsername, message }],
      });

      this.messages = [{ senderUsername, message }];
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    handleOldMessages(messages) {
      this.messageFromAllRooms = [];
      messages.forEach((message) => {
        this.messageFromAllRooms.push({
          roomId: message.roomId,
          messages: [
            {
              senderUsername: message.senderUsername,
              message: message.message,
            },
          ],
        });
      });
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    fetchConnectedTutors() {
      const comp = this;
      comp.isLoading = true;
      apiRequestManager("get", "/student/connected-tutors", {}, {}, (res) => {
        comp.isLoading = false;
        if (res.status === 200) {
          this.rooms = [];
          res.data.connectedTutors.forEach((connectedTutor) => {
            this.rooms.push({
              tutorName: connectedTutor.username,
              roomId: `${this.studentUsername}_${connectedTutor.username}`,
            });
            comp.joinRoom(this.studentUsername, connectedTutor.username);
          });
          return;
        }
      });
    },
    onRoomSelect(roomId) {
      this.selectedRoomId = roomId;
      this.messages =
        this.messageFromAllRooms.find((rooms) => rooms.roomId === roomId)
          ?.messages || [];
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    onMessageEnter(e) {
      if (e.key === "Enter") {
        this.sendMessage();
      }
    },
  },
  mounted() {
    this.studentUsername = localStorage.getItem("username");
    this.fetchConnectedTutors();
  },
  watch: {
    $route: "fetchConnectedTutors",
  },
};
</script>

<style scoped>
.message-area {
  height: calc(100vh - 115px);
  padding: 20px !important;
  overflow-y: auto;
}
.chat-wrapper {
  padding: 10px 0 !important;
}
.chat {
  background-color: #071f5d;
  color: #fff;
  padding: 10px;
  text-align: center;
}
.message-item {
  padding: 10px 20px;
  margin: 2px 0;
  color: #fff;
  max-width: 400px;
  border-radius: 30px;
}
.current-user-message-item {
  background-color: #071f5d;
}
.not-current-user-message-item {
  background-color: #006fb7;
}
.current-user {
  display: flex;
  justify-content: flex-end;
}
.not-current-user {
  display: flex;
  justify-content: start;
}
</style>
