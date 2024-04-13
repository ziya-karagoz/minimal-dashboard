import Card from "@base/components/common/cards/Card";
import { IContactResponseD } from "../core/models/contact.interface";
import React from "react";
import { FetchStatus } from "@base/enums/api.enum";
import {
  completeContact,
  createContactMessage,
  getContact,
} from "../core/api/contact.requests";
import { useNavigate, useParams } from "react-router";
import Loader from "@base/layout/components/loader/Loader";
import Badge from "@base/components/common/badge/Badge";
import {
  EContactAdminType,
  EContactStatus,
  EContactStatusL,
} from "../core/models/contact.enum";
import { useAuth } from "@app/modules/auth";
import moment from "@base/helpers/enhencers/Moment";
import { Icon } from "@iconify/react/dist/iconify.js";
import { hasPermission } from "@base/helpers/permissions/permission.helper";
import { ERole } from "@base/enums/role.enum";
import Button from "@base/components/common/buttons/Button";
import toast from "react-hot-toast";
import { swal } from "@base/components/common/alerts/SwalAlert";

const ContactDetail = () => {
  const messagesEndRef = React.useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id: contactId } = useParams();
  const [contactDetail, setContactDetail] = React.useState<
    IContactResponseD | undefined
  >(undefined);

  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );
  const [message, setMessage] = React.useState<string>("");

  React.useEffect(() => {
    if (contactId) {
      setFetchStatus(FetchStatus.LOADING);
      getContact(parseInt(contactId))
        .then((res) => {
          setFetchStatus(FetchStatus.SUCCEEDED);
          let reversedNotes = res.notes.reverse();
          setContactDetail({
            ...res,
            notes: reversedNotes,
          });
        })
        .catch(() => {
          setFetchStatus(FetchStatus.FAILED);
        });
    }
  }, [contactId]);

  function handleSendMessage() {
    createContactMessage({
      contact_id: parseInt(contactId!),
      message: message,
    }).then(() => {
      getContact(parseInt(contactId!))
        .then((res) => {
          let reversedNotes = res.notes.reverse();
          setContactDetail({
            ...res,
            notes: reversedNotes,
          });
        })
        .catch(() => {});
      scrollToBottom();
      setMessage("");
    });
  }
  function scrollToBottom() {
    (messagesEndRef.current as HTMLElement | null)?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function handleCompleteContact() {
    swal
      .fire({
        title: "İletişim İsteğini Tamamla",
        text: "İletişim İsteğini tamamlamak istediğinizden emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Evet",
        cancelButtonText: "Hayır",
      })
      .then((result) => {
        if (result.isConfirmed) {
          completeContact(parseInt(contactId!)).then(() => {
            toast.success("İletişim İsteği Tamamlandı");
            navigate(-1);
          });
        }
      });
  }

  React.useEffect(() => {
    scrollToBottom();
  }, [contactDetail?.notes]);

  if (fetchStatus !== FetchStatus.SUCCEEDED) return <Loader isComponent />;
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-4">İletişim İsteği Detayı</h1>
        {(currentUser?.id === contactDetail?.admin.id ||
          hasPermission(ERole.ContactMessageSuper)) &&
        contactDetail?.status === EContactStatus.PROCESS ? (
          <Button color="red" onClick={handleCompleteContact}>
            İletişim İsteğini Tamamla
          </Button>
        ) : null}
      </div>
      <section className="grid grid-cols1 md:grid-cols-2 gap-8">
        <Card>
          <Card.Header>
            <h4 className="font-semibold">Kullanıcı Bilgileri</h4>
          </Card.Header>
          <Card.Body>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">Adı</div>
                <div className="w-2/3">{contactDetail?.first_name}</div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">Soyadı</div>
                <div className="w-2/3">{contactDetail?.last_name}</div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">Telefon</div>
                <div className="w-2/3">{contactDetail?.phone ?? "-"}</div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">Email</div>
                <div className="w-2/3">{contactDetail?.email}</div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h4 className="font-semibold">Kullanıcı Mesajı</h4>
          </Card.Header>
          <Card.Body>
            <p>{contactDetail?.message}</p>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h4 className="font-semibold">İletişim Durumu</h4>
          </Card.Header>
          <Card.Body>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">Durum</div>
                <div className="w-2/3">
                  <Badge
                    color={
                      contactDetail?.status === EContactStatus.COMPLETED
                        ? "green"
                        : contactDetail?.status === EContactStatus.PROCESS
                        ? "red"
                        : contactDetail?.status === EContactStatus.PENDING
                        ? "yellow"
                        : "gray"
                    }
                  >
                    {contactDetail?.status === EContactStatus.COMPLETED
                      ? EContactStatusL[EContactStatus.COMPLETED]
                      : contactDetail?.status === EContactStatus.PROCESS
                      ? EContactStatusL[EContactStatus.PROCESS]
                      : contactDetail?.status === EContactStatus.PENDING
                      ? EContactStatusL[EContactStatus.PENDING]
                      : "Bilinmiyor"}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">
                  İlgili Yetkili
                </div>
                <div className="w-2/3">
                  {contactDetail?.related_employee_name_surname}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">
                  Tamamlayan Yetkili
                </div>
                <div className="w-2/3">
                  {contactDetail?.completed_admin_name_surname ?? "-"}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h4 className="font-semibold">Teknik Bilgiler</h4>
          </Card.Header>
          <Card.Body>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">
                  Oluşturulma Tarihi
                </div>
                <div className="w-2/3">
                  {moment(contactDetail?.created_at).format(
                    "DD.MM.YYYY, HH:mm:ss"
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">Cihaz</div>
                <div className="w-2/3">{contactDetail?.device}</div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">IP Adresi</div>
                <div className="w-2/3">{contactDetail?.ip_address ?? "-"}</div>
              </div>
              <div className="flex justify-between">
                <div className="w-1/3 text-sm text-gray-600">Tarayıcı</div>
                <div className="w-2/3">{contactDetail?.user_agent}</div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </section>
      <div className="mt-8">
        <div
          id="contact_messages"
          className="flex flex-col space-y-4 p-3 overflow-y-auto h-96 fancy-scrollbar"
        >
          {contactDetail?.notes.map((note, index) => (
            <React.Fragment key={index}>
              {note.admin.id === currentUser?.id ? (
                <div className="flex items-end justify-end">
                  <div className="flex flex-col space-y-2 text-sm max-w-sm mx-2 order-1 items-end">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-red-500 text-white ">
                        {/* name */}
                        <span className="text-xs text-red-200">
                          {note.owner_name_surname}
                        </span>

                        {/* note message */}
                        <span className="block">{note.message}</span>
                        {/* date */}
                        <span className="text-xs text-red-200">
                          {moment(note.created_at).fromNow()}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="relative w-8 h-8 order-2">
                    <img
                      src={note.admin.image}
                      alt="admin_image"
                      className="w-8 h-8 rounded-full "
                    />
                    {note.type === EContactAdminType.SUPER ? (
                      <Icon
                        icon="humbleicons:crown"
                        className="absolute -top-1 -right-2 text-red-400"
                      />
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="flex items-end">
                  <div className="flex flex-col space-y-2 text-sm max-w-sm mx-2 order-2 items-start">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-100 text-white ">
                        {/* name */}
                        <span className="text-xs text-gray-500">
                          {note.owner_name_surname}
                        </span>

                        {/* note message */}
                        <span className="block text-gray-800">
                          {note.message}
                        </span>
                        {/* date */}
                        <span className="text-xs text-gray-600">
                          {moment(note.created_at).fromNow()}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="relative w-8 h-8 order-1">
                    <img
                      src={note.admin.image}
                      alt="admin_image"
                      className="w-8 h-8 rounded-full "
                    />
                    {note.type === EContactAdminType.SUPER ? (
                      <Icon
                        icon="humbleicons:crown"
                        className="absolute -top-1 -right-2 text-red-400"
                      />
                    ) : null}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </React.Fragment>
          ))}
        </div>
        {(currentUser?.id === contactDetail?.admin.id ||
          hasPermission(ERole.ContactMessageSuper)) &&
        contactDetail?.status === EContactStatus.PROCESS ? (
          <div className="w-full mt-1">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Gönder
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-red-500 focus:outline-red-500 "
                placeholder="Not Ekle..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                type="button"
                className="flex justify-center items-center gap-1 text-white absolute end-2.5 bottom-2.5 bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                <span>Yayınla</span>
                <Icon icon="iconamoon:send-fill" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ContactDetail;
