class DataTable extends HTMLElement {
  constructor() {
    super();
    this.api = this.getAttribute("api");
    this.pk = this.getAttribute("data");
    this.columns = [];
    this.columnsType = [];
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
      <style>
        .modal-bg {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        .modal-content-custom {
            background: white;
            padding: 20px;
            border-radius: 12px;
            width: 400px;
        }
      </style>
      
      <div class="row mb-2">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title"><i class="bi bi-table" id="titleTable" ></i>${this.title}</h3>
                <div class="card-tools">
                  <button class="btn btn-sm btn-primary me-2" id="addBtn">
                    <i class="bi bi-plus-circle"></i> Tambah Parcel
                  </button>
                </div>
              </div>
              <div class="card-body table-responsive">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr id="tableHead"></tr>
                  </thead>
                  <tbody id="tableBody">
                  <tr><td>Loading...</td></tr>
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-bg" id="modal">
          <div class="modal-content-custom">
              <h4 id="modalTitle">Tambah Data</h4>
              <form id="form"></form>
              <div class="mt-3 text-end">
                  <button class="btn btn-secondary" id="closeModal">Batal</button>
                  <button class="btn btn-primary" id="saveBtn">Simpan</button>
                
              </div>
          </div>
        </div>
    `;
  }

  async connectedCallback() {
    this.title = this.getAttribute("title");
    this.detail = this.getAttribute("detail");
    this.detailUrl = this.getAttribute("detailUrl");
    this.pk = this.getAttribute("data");
    this.shadowRoot.querySelector("#titleTable").innerHTML = this.title;
    // this.shadowRoot.querySelector("#detailBtn").href = this.detailUrl;

    // 🔥 LOAD <item-field> FROM USER HTML
    this.customFields = [...this.querySelectorAll("item-field")].map((el) => ({
      name: el.getAttribute("name"),
      label: el.getAttribute("label") ?? el.getAttribute("name"),
      type: el.getAttribute("type") ?? "string",
    }));

    await this.loadOptions();

    // 🔥 If customFields exist, override DRF metadata
    if (this.customFields.length > 0) {
      this.columnsType = this.customFields;
      this.columns = this.customFields.map((f) => f.name);
    }

    this.drawTableHead();
    this.loadData();

    this.shadowRoot.querySelector("#addBtn").onclick = () => this.openForm();
    this.shadowRoot.querySelector("#closeModal").onclick = () =>
      this.closeForm();
    this.shadowRoot.querySelector("#saveBtn").onclick = () => this.saveData();
  }

  // Load DRF OPTIONS metadata
  async loadOptions() {
    const res = await fetch(this.api, { method: "OPTIONS" });
    const meta = await res.json();

    const actions = meta.actions?.POST || meta.actions?.PUT;
    if (!actions) return;

    this.columns = Object.keys(actions);
    this.columnsType = this.columns.map((e) => ({
      name: e,
      type: actions[e].type,
    }));
  }

  drawTableHead() {
    const head = this.shadowRoot.querySelector("#tableHead");
    head.innerHTML = `
      ${this.columnsType.map((c) => `<th>${c.label ?? c.name}</th>`).join("")}
      <th>Aksi</th>
    `;
  }

  async loadData() {
    const res = await fetch(this.api);
    const data = await res.json();
    const tbody = this.shadowRoot.querySelector("#tableBody");
    if (data.results.length < 1) {
      const colCount = tbody.parentElement.querySelectorAll("thead th").length; // jumlah kolom
      tbody.innerHTML = `
      <tr>
        <td colspan="${colCount}" style="
          text-align: center; 
          padding: 20px; 
          background: #f0f0f0;
          color: #333;
          font-weight: bold;
        ">
          Data kosong tidak ditemukan
        </td>
      </tr>
    `;
    } else {
      tbody.innerHTML = "";
    }

    data.results.forEach((item) => {
      const row = document.createElement("tr");

      this.columns.forEach((col) => {
        const td = document.createElement("td");
        td.textContent = item[col] ?? "-";
        row.appendChild(td);
      });
      //   console.log(item);
      row.innerHTML += `
        <td>
          <button class="btn btn-sm btn-warning editBtn" data-id="${
            item[this.columns[0]]
          }">Edit</button>
          <button class="btn btn-sm btn-danger deleteBtn" data-id="${
            item[this.columns[0]]
          }">Delete</button>
          
        </td>
      `;
      // """<button class="btn btn-sm btn-warning editBtn" href="${this.detailUrl}${item[this.columns[0]]}">Edit</button>"""
      tbody.appendChild(row);
    });

    this.shadowRoot.querySelectorAll(".editBtn").forEach((b) => {
      console.log(b);
      b.onclick = () => this.openForm(b.dataset.id);
    });

    this.shadowRoot.querySelectorAll(".deleteBtn").forEach((b) => {
      b.onclick = () => this.deleteData(b.dataset.id);
    });
  }

  openForm(id = null) {
    console.log(id);
    this.editId = id;
    const modal = this.shadowRoot.querySelector("#modal");
    const form = this.shadowRoot.querySelector("#form");

    if (id) {
      this.shadowRoot.querySelector("#modalTitle").innerText = "Edit Data";

      fetch(`${this.api}${id}`)
        .then((r) => r.json())
        .then((d) => {
          form.innerHTML = this.columnsType
            .filter((c) => c.name !== this.pk)
            .map((c) => {
              const value = d[c.name] ?? "";
              if (c.type === "string") {
                return `
                  <label>${c.name}</label>
                  <input type="text" class="form-control" name="${c.name}" value="${value}">
                `;
              }
              if (c.type === "integer") {
                return `
                  <label>${c.name}</label>
                  <input type="number" class="form-control" name="${c.name}" value="${value}">
                `;
              }
              if (c.type === "date") {
                const dt = value ? value.split("T")[0] : "";
                return `
                  <label>${c.name}</label>
                  <input type="date" class="form-control" name="${c.name}" value="${dt}">
                `;
              }
              return `
                <label>${c.name}</label>
                <input class="form-control" name="${c.name}" value="${value}">
              `;
            })
            .join("");
        });
    } else {
      this.shadowRoot.querySelector("#modalTitle").innerText = "Tambah Data";

      form.innerHTML = this.columnsType
        .filter((c) => c.name !== this.pk)
        .map((c) => {
          if (c.type === "string") {
            return `
                  <label>${c.name}</label>
                  <input type="text" class="form-control" name="${c.name}"">
                `;
          }
          if (c.type === "integer") {
            return `
                  <label>${c.name}</label>
                  <input type="number" class="form-control" name="${c.name}"">
                `;
          }
          if (c.type === "date") {
            return `
                  <label>${c.name}</label>
                  <input type="date" class="form-control" name="${c.name}" value="">
                `;
          }
          return `
                <label>${c.name}</label>
                <input class="form-control" name="${c.name}"">
              `;
        })
        .join("");
    }

    modal.style.display = "flex";
  }

  closeForm() {
    this.shadowRoot.querySelector("#modal").style.display = "none";
  }

  async saveData() {
    const form = this.shadowRoot.querySelector("#form");
    const data = {};

    this.columns.forEach((c) => {
      if (c !== this.pk) {
        data[c] = form.querySelector(`[name="${c}"]`).value;
      }
    });

    const method = this.editId ? "PUT" : "POST";
    const url = this.editId ? `${this.api}${this.editId}/` : this.api;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    this.closeForm();
    this.loadData();
  }

  async deleteData(id) {
    if (!confirm("Hapus data?")) return;
    await fetch(`${this.api}${id}`, { method: "DELETE" });
    this.loadData();
  }
}

customElements.define("data-table", DataTable);

// Item Fieldnya
class ItemField extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Optional: validasi attribute wajib
    if (!this.getAttribute("name")) {
      console.warn("<item-field> missing required attribute: name");
    }
  }
}

customElements.define("item-field", ItemField);
