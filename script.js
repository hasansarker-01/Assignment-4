      // SELECT ELEMENTS
      const cards = document.querySelectorAll(".job-card")
      const tabBtns = document.querySelectorAll(".tabBtn")
      const emptyState = document.getElementById("emptyState")
      const totalCount = document.getElementById("totalCount")
      const interviewCount = document.getElementById("interviewCount")
      const rejectedCount = document.getElementById("rejectedCount")
      const tabCount = document.getElementById("tabCount")
      let currentTab = "all"

      // DEFAULT STATUS SET
      for (let i = 0; i < cards.length; i++) {
          cards[i].dataset.status = "all"
      }
      // DASHBOARD COUNT
      function updateCounts() {
          const allCards = document.querySelectorAll(".job-card")
          let interviewNum = 0
          let rejectedNum = 0
          for (let i = 0; i < allCards.length; i++) {
              if (allCards[i].dataset.status === "interview") interviewNum++
                  if (allCards[i].dataset.status === "rejected") rejectedNum++
          }
          totalCount.innerText = allCards.length
          interviewCount.innerText = interviewNum
          rejectedCount.innerText = rejectedNum
      }

      // AVAILABLE JOB COUNT (RIGHT SIDE)
      function updateAvailableJobs() {
          const allJobs = document.querySelectorAll(".job-card")
          tabCount.innerText = allJobs.length + " jobs"
      }

      // FILTER TAB
      function filterCards() {
          const allCards = document.querySelectorAll(".job-card")
          let visible = 0
          for (let i = 0; i < allCards.length; i++) {
              if (currentTab === "all" || allCards[i].dataset.status === currentTab) {
                  allCards[i].style.display = "block"
                  visible++
              } else {
                  allCards[i].style.display = "none"
              }
          }
          emptyState.style.display = visible === 0 ? "block" : "none"
      }

      // TAB CLICK
      for (let i = 0; i < tabBtns.length; i++) {
          tabBtns[i].onclick = function() {
              for (let j = 0; j < tabBtns.length; j++) {
                  tabBtns[j].classList.remove("bg-blue-500", "text-white")
                  tabBtns[j].classList.add("bg-gray-200")
              }
              this.classList.add("bg-blue-500", "text-white")
              this.classList.remove("bg-gray-200")
              currentTab = this.innerText.toLowerCase()
              filterCards()
          }
      }

      // CARD BUTTON EVENTS
      for (let i = 0; i < cards.length; i++) {

          const card = cards[i]
          const interviewBtn = card.querySelector(".interview")
          const rejectBtn = card.querySelector(".reject")
          const deleteBtn = card.querySelector(".delete")

          // INTERVIEW
          interviewBtn.onclick = function() {
              card.dataset.status = "interview"
              const label = card.querySelector(".bg-gray-200, .bg-green-200, .bg-red-200")
              label.innerText = "INTERVIEW"
              label.classList.remove("bg-gray-200", "bg-red-200")
              label.classList.add("bg-green-200")
              updateCounts()
              filterCards()
          }

          // REJECTED
          rejectBtn.onclick = function() {
              card.dataset.status = "rejected"
              const label = card.querySelector(".bg-gray-200, .bg-green-200, .bg-red-200")
              label.innerText = "REJECTED"
              label.classList.remove("bg-gray-200", "bg-green-200")
              label.classList.add("bg-red-200")
              updateCounts()
              filterCards()
          }

          // DELETE
          deleteBtn.onclick = function() {
              card.remove()
              updateCounts()
              updateAvailableJobs() //
          }

      }

      // INITIAL LOAD
      updateCounts()
      updateAvailableJobs()
      filterCards()