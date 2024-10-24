<template>
  <div>
    <div class="columns">
      <div class="column is-one-quarter chat-wrapper">
        <div
          v-for="room in rooms"
          :key="room.studentUsername"
          @click="
            () => {
              onStudentSelect(room.studentUsername);
            }
          "
          class="hover-style chat"
        >
          {{ room.studentName }}
        </div>
      </div>
      <div class="column">
        <div class="message-area" ref="messageContainer">
          <div
            v-for="(messageItem, index) in messages"
            :key="index"
            :class="
              messageItem.senderUsername === username
                ? `current-user`
                : `not-current-user`
            "
          >
            <div
              :class="`message-item ${
                messageItem.senderUsername === username
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
  name: "TutorChats",
  data() {
    return {
      socket: null,
      isLoading: false,
      messageFromAllRooms: [],
      messages: [],
      selectedStudentUsername: "",
      rooms: [],
      message: "",
      username: "",
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
    joinRoom(username) {
      this.socket.emit("joinRoom", username);
    },
    sendMessage() {
      this.socket.emit("sendMessage", {
        senderUsername: this.username,
        receiverUsername: this.selectedStudentUsername,
        message: this.message,
      });
    },
    handleIncomingMessage({
      senderUsername,
      receiverUsername,
      messageId,
      createdAt,
      message,
    }) {
      console.log(
        senderUsername,
        receiverUsername,
        messageId,
        createdAt,
        message
      );
      if (senderUsername === this.username) {
        this.message = "";
      } else {
        const audio = new Audio(require("@/assets/audio/chat.mp3"));
        audio.play();
      }

      const isFound = this.messageFromAllRooms.find(
        (room) =>
          room.studentUsername === receiverUsername ||
          room.studentUsername === senderUsername
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
        studentUsername:
          this.username === receiverUsername
            ? senderUsername
            : receiverUsername,
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
      console.log(messages);
      messages.forEach((message) => {
        const isFound = this.messageFromAllRooms.find(
          (ar) =>
            ar.studentUsername === message.senderUsername ||
            ar.studentUsername === message.receiverUsername
        );

        if (isFound) {
          isFound.messages.push({
            senderUsername: message.senderUsername,
            message: message.message,
          });
        } else {
          this.messageFromAllRooms.push({
            studentUsername:
              message.senderUsername === this.username
                ? message.receiverUsername
                : message.senderUsername,
            messages: [
              {
                senderUsername: message.senderUsername,
                message: message.message,
              },
            ],
          });
        }
      });
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    fetchAcceptedRequests() {
      const comp = this;
      comp.isLoading = true;
      apiRequestManager("get", "/tutor/accepted-requests", {}, {}, (res) => {
        comp.isLoading = false;
        if (res.status === 200) {
          this.rooms = [];
          res.data.requests.forEach((request) => {
            this.rooms.push({
              studentName: request.username,
              studentUsername: request.username,
            });
          });
          return;
        }
      });
    },
    onStudentSelect(studentUsername) {
      this.selectedStudentUsername = studentUsername;
      this.messages =
        this.messageFromAllRooms.find(
          (rooms) => rooms.studentUsername === studentUsername
        )?.messages || [];
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
    this.username = localStorage.getItem("username");
    this.joinRoom(this.username);
    this.fetchAcceptedRequests();
  },
  watch: {
    $route: "fetchAcceptedRequests",
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
